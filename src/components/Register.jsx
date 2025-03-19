import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router";
import Loader from "./loaders/Loader";
export default function Register({ token, login }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/inicio");
    }
  }, [token, navigate]);
  const handlerSubmitRegister = async (e) => {
    e.preventDefault();

    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, name, lastname, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        swal.fire({
          title: "Error al Registrarse!",
          text: data.error || "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        setLoading(true);

        return; // Detiene la ejecución aquí
      }
      swal.fire({
        title: "¡Éxito!",
        text: `Bienvenido ${data.email}!`,
        icon: "success",
        confirmButtonText: "Ok",
      });

      const user = data;
      login(data.token, user);
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      swal.fire({
        title: "Error al Iniciar Sesión",
        text: "No se pudo conectar con el servidor. Intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLoading(true);
    }
  };
  const handlerClick = () => {
    setLoading(false);
  };

  return (
    <div className="text-dark vh-100 d-flex flex-column justify-content-center align-items-center aparecer ">
      <form
        className="bg-light p-4 rounded needs-validation shadow"
        onSubmit={handlerSubmitRegister}
      >
        <h2 className="mb-4 text-center">Registro 🏀⛹️‍♂️</h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="emailRegister">
            E-mail :
          </label>
          <input
            className="form-control"
            type="email"
            name="emailRegister"
            id="emailRegister"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="usernameRegister">
            Usuario :
          </label>
          <input
            className="form-control"
            type="text"
            id="usernameRegister"
            name="usernameRegister"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="usernameRegister">
            Nombre :
          </label>
          <input
            className="form-control"
            type="text"
            id="nameRegister"
            name="usernameRegister"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="usernameRegister">
            Apellido :
          </label>
          <input
            className="form-control"
            type="text"
            id="lastNameRegister"
            name="usernameRegister"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="passwordRegister">
            Contraseña:
          </label>
          <input
            className="form-control"
            type="password"
            id="passwordRegister"
            name="passwordRegister"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-success"
            onClick={handlerClick}
          >
            {loading ? "Registrarse 🏀" : <Loader />}
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
        <button
          className="btn btn-outline-light"
          onClick={() => {
            navigate("/");
          }}
        >
          Volver ⛹️‍♂️
        </button>
      </div>
    </div>
  );
}
