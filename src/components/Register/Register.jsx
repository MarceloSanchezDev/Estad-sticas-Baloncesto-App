import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Loader from "../loaders/Loader";

export default function Register() {
  const { token, login } = useAuth();
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
    <div className="text-dark d-flex flex-column justify-content-center align-items-center aparecer mt-3">
      <form
        role="form"
        className="bg-light p-4 rounded needs-validation shadow"
        onSubmit={handlerSubmitRegister}
      >
        <h2 className="mb-4 text-center">Registro 🏀⛹️‍♂️</h2>
        <div className="mb-3">
          <label className="form-label px-2" htmlFor="emailRegister">
            E-mail :
          </label>
          <input
            role="textbox"
            className="form-control"
            type="email"
            name="email"
            id="emailRegister"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="TuEmali@TuDominio.com"
            aria-describedby="emailRegisterHelpBlock"
          />
          <div
            id="emailRegisterHelpBlock"
            className="form-text px-2"
            role="alert"
          >
            Tu E-mail debe ser correcto
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label px-2" htmlFor="userUsernameRegister">
            Usuario :
          </label>
          <input
            role="textbox"
            className="form-control"
            type="text"
            id="userUsernameRegister"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="tu Username"
            aria-describedby="userRegisterHelpBlock"
          />
          <div
            id="userRegisterHelpBlock"
            className="form-text px-2"
            role="alert"
          >
            Tu nombre de Usuario como te reconoceran
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label px-2" htmlFor="userNameRegister">
            Nombre :
          </label>
          <input
            role="textbox"
            className="form-control"
            type="text"
            id="userNameRegister"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu Nombre"
            aria-describedby="nameRegisterHelpBlock"
          />
          <div
            id="nameRegisterHelpBlock"
            className="form-text px-2"
            role="alert"
          >
            Tu nombre real
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label px-2" htmlFor="userLastnameRegister">
            Apellido :
          </label>
          <input
            role="textbox"
            className="form-control"
            type="text"
            id="userLastnameRegister"
            name="lastname"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Tu Apellido"
            aria-describedby="lasnameRegisterHelpBlock"
          />
          <div
            id="lasnameRegisterHelpBlock"
            className="form-text px-2"
            role="alert"
          >
            Tu apellido real
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label px-2" htmlFor="userPasswordRegister">
            Contraseña :
          </label>
          <input
            role="textbox"
            className="form-control"
            type="password"
            id="userPasswordRegister"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            aria-describedby="passwordRegisterHelpBlock"
          />
          <div
            id="passwordRegisterHelpBlock"
            className="form-text px-2"
            role="alert"
          >
            Tu Contraseña debe tener un minimo de 6 caracteres y un maximo de
            20,
            <br /> Solo debe contener numeros y letras, y no debe contener
            emojis, caracteres especiales o espacios.
          </div>
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
      <div className="mt-3 text-center mb-3">
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
