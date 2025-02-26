export default function Nav({ token, logout }) {
  return (
    <nav className="bg-light p-3 border-end" style={{ width: "300px" }}>
      <h2 className="mb-4">🏀 Estadísticas</h2>
      <ul className="nav flex-column gap-2">
        <li>
          <button className="btn btn-outline-dark w-100">Perfil</button>
        </li>
        <li>
          <button className="btn btn-outline-dark w-100">Calendario</button>
        </li>
        <li>
          <button className="btn btn-outline-dark w-100">
            Todas Las Estadísticas
          </button>
        </li>
        <li>
          <button className="btn btn-outline-dark w-100">
            Nueva Estadística
          </button>
        </li>
        <li>
          <button className="btn btn-outline-dark w-100">
            Porcentaje Total
          </button>
        </li>
        <li>
          <button className="btn btn-danger w-100" onClick={() => logout()}>
            LogOut
          </button>
        </li>
      </ul>
    </nav>
  );
}
