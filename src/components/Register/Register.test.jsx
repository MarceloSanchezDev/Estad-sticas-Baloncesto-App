import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register.jsx";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
let mockToken = null;
let loginMock = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: mockToken, login: loginMock }),
}));

beforeEach(() => {
  global.fetch = vi.fn();
  mockNavigate.mockClear();
  loginMock = vi.fn(); // reiniciamos el mock de login
  mockToken = null; // por defecto: no logueado
});
afterEach(() => {
  vi.resetAllMocks();
});
function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Register />
    </MemoryRouter>
  );
}
vi.mock("sweetalert2", () => {
  const fire = vi.fn(() => Promise.resolve({ isConfirmed: true }));
  return {
    __esModule: true,
    default: { fire },
    fire, // por si lo importás con nombre
  };
});

test('muestra el título "Registro" y los botones de Registrarse y Volver', () => {
  renderWithRouter();
  const title = screen.getByRole("heading", {
    name: /Registro 🏀⛹️‍♂️/i,
  });
  const buttons = screen.getAllByRole("button");
  expect(title).toBeInTheDocument();
  expect(buttons[0], /Registrarse 🏀/i);
  expect(buttons[1], /Volver ⛹️‍♂️/);
});
test("muestra el formulario de Registro ", () => {
  renderWithRouter();
  const form = screen.getByRole("form");

  expect(form).toBeInTheDocument();
  const labelEmail = screen.getByLabelText(/E-mail :/);
  const labelUser = screen.getByLabelText(/Usuario :/);
  const inputName = screen.getByLabelText(/Nombre :/);
  const inputSurName = screen.getByLabelText(/Apellido :/);
  const inputPass = screen.getByLabelText(/Contraseña :/);

  expect(labelEmail).toBeInTheDocument();
  expect(labelUser).toBeInTheDocument();
  expect(inputName).toBeInTheDocument();
  expect(inputSurName).toBeInTheDocument();
  expect(inputPass).toBeInTheDocument();

  const inputs = screen.getAllByRole("textbox");
  expect(inputs[0], /E-mail :/i);
  expect(inputs[1], /Usuario :/i);
  expect(inputs[2], /Nombre :/i);
  expect(inputs[3], /Apellido :/i);
  expect(inputs[4], /Contraseña :/i);
});
test("redirige automáticamente a /inicio si ya hay token (useEffect)", async () => {
  // Simulamos usuario ya logueado
  mockToken = "jwt123";
  renderWithRouter();

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });
});
test("registro exitoso: hace fetch, muestra éxito y llama a registro del contexto", async () => {
  renderWithRouter();

  // Mock del backend
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      email: "test@x.com",
      username: "marcelo",
      nombre: "Marcelo",
      apellido: "Sánchez",
      posicion: "Base",
      categoria: "A",
      token: "jwt123",
    }),
  });

  // Completar formulario
  await userEvent.type(screen.getByLabelText(/E-mail :/i), "test@x.com");
  await userEvent.type(screen.getByLabelText(/Usuario :/i), "marcelo");
  await userEvent.type(screen.getByLabelText(/Nombre :/i), "Marcelo");
  await userEvent.type(screen.getByLabelText(/Apellido :/i), "Sánchez");
  await userEvent.type(screen.getByLabelText(/Contraseña :/i), "123456");

  // Enviar
  await userEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

  // Verificamos que se llamó al backend correcto
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "/api/auth/register",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@x.com",
          username: "marcelo",
          name: "Marcelo",
          lastname: "Sánchez",
          password: "123456",
        }),
      })
    );
  });

  // Se llama a login(token, user)
  await waitFor(() => {
    expect(loginMock).toHaveBeenCalledWith(
      "jwt123",
      expect.objectContaining({
        email: "test@x.com",
        username: "marcelo",
      })
    );
  });
});
test("Registro con error 401: NO llama a login y maneja el error", async () => {
  renderWithRouter();

  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: "Error al registrar el usuario" }),
  });

  await userEvent.type(screen.getByLabelText(/E-mail :/i), "testcom");
  await userEvent.type(screen.getByLabelText(/Usuario :/i), "marcelo");
  await userEvent.type(screen.getByLabelText(/Nombre :/i), "marcelo");
  await userEvent.type(screen.getByLabelText(/Apellido :/i), "marcelo");
  await userEvent.type(screen.getByLabelText(/Contraseña :/i), "123456");
  await userEvent.click(
    screen.getByRole("button", { name: /Registrarse 🏀/i })
  );

  await waitFor(() => {
    expect(loginMock).not.toHaveBeenCalled();
  });
});
