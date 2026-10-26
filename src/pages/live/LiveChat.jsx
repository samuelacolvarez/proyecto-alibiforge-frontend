import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketContext";

export default function LiveChat() {
  const { socket, conectado } = useSocket();
  const [mensajes, setMensajes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [escribiendo, setEscribiendo] = useState([]);
  const [texto, setTexto] = useState("");
  const finRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    function onMensaje(mensaje) {
      setMensajes((prev) => [...prev.slice(-199), mensaje]);
    }
    function onLista(lista) {
      setUsuarios(lista);
    }
    function onEscribiendo({ id, nombre, escribiendo: activo }) {
      setEscribiendo((prev) => {
        const sinEste = prev.filter((u) => u.id !== id);
        return activo ? [...sinEste, { id, nombre }] : sinEste;
      });
    }

    socket.on("chat:mensaje", onMensaje);
    socket.on("usuario:lista", onLista);
    socket.on("chat:escribiendo", onEscribiendo);
    if (socket.connected) socket.emit("usuario:listar");

    return () => {
      socket.off("chat:mensaje", onMensaje);
      socket.off("usuario:lista", onLista);
      socket.off("chat:escribiendo", onEscribiendo);
    };
  }, [socket]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  function handleChange(e) {
    setTexto(e.target.value);
    socket.emit("chat:escribiendo", true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => socket.emit("chat:escribiendo", false), 1500);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const limpio = texto.trim();
    if (!limpio || !conectado) return;
    socket.emit("chat:mensaje", limpio);
    socket.emit("chat:escribiendo", false);
    setTexto("");
  }

  return (
    <main className="page">
      <div className="case-card case-card-wide live-chat">
        <span className={`stamp ${conectado ? "stamp-approved" : "stamp-rejected"}`}>
          {conectado ? "En vivo" : "Desconectado"}
        </span>
        <h1>Sala en vivo</h1>

        <p className="live-users">
          Conectados ({usuarios.length}): {usuarios.map((u) => u.nombre).join(", ") || "nadie"}
        </p>

        <div className="live-messages">
          {mensajes.length === 0 && <p>Todavía no hay mensajes.</p>}
          {mensajes.map((m) => (
            <p
              key={m.id}
              className={m.sistema ? "live-msg live-msg-system" : m.autorId === socket.id ? "live-msg live-msg-mine" : "live-msg"}
            >
              {!m.sistema && <strong>{m.autor}: </strong>}
              {m.texto}
            </p>
          ))}
          <div ref={finRef} />
        </div>

        <p className="live-typing">
          {escribiendo.length > 0 && `${escribiendo.map((u) => u.nombre).join(", ")} está escribiendo…`}
        </p>

        <form className="live-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={texto}
            onChange={handleChange}
            placeholder="Escribe un mensaje…"
            maxLength={300}
            disabled={!conectado}
          />
          <button type="submit" className="btn btn-primary" disabled={!conectado || !texto.trim()}>
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}