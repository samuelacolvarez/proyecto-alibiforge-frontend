import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateAlibi from "./pages/CreateAlibi";
import AlibiDetail from "./pages/AlibiDetail";
import MyAlibis from "./pages/MyAlibis";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import CreateSituationPage from "./pages/CreateSituationPage.jsx";
import RankingsPage from "./pages/RankingsPage.jsx";
import SituationDetailPage from "./pages/SituationDetailPage.jsx";
import SituationsPage from "./pages/SituationsPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coartadas/nueva"
          element={
            <ProtectedRoute>
              <CreateAlibi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coartadas/:id/editar"
          element={
            <ProtectedRoute>
              <CreateAlibi />
            </ProtectedRoute>
          }
        />
        <Route path="/coartadas/:id" element={<AlibiDetail />} />
        <Route
          path="/mis-coartadas"
          element={
            <ProtectedRoute>
              <MyAlibis />
            </ProtectedRoute>
          }
        />

        <Route path="/situations" element={<SituationsPage />} />
        <Route path="/situations/new" element={<CreateSituationPage />} />
        <Route path="/situations/:id" element={<SituationDetailPage />} />
        <Route path="/rankings" element={<RankingsPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}