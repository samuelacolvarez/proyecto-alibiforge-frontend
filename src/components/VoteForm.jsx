import { useState } from 'react'

function UserSelector() {
  const [userId, setUserId] = useState(
    localStorage.getItem('userId') || '12',
  )

  function handleChange(event) {
    const selectedUser = event.target.value
    setUserId(selectedUser)
    localStorage.setItem('userId', selectedUser)
    window.dispatchEvent(new Event('userChanged'))
  }

  return (
    <label className="user-selector">
      Usuario
      <select value={userId} onChange={handleChange}>
        {Array.from({ length: 12 }, (_, index) => index + 1).map((id) => (
          <option key={id} value={id}>
            Usuario {id}
          </option>
        ))}
      </select>
    </label>
  )
}

export default UserSelector

