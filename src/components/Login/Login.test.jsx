import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login.jsx";
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
      <Login />
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

test('muestra el título "Login" y los botones de Ingresar y Volver', () => {
  renderWithRouter();
  const title = screen.getByRole("heading", {
    name: /Iniciar Sesión 🏀⛹️‍♂️/i,
  });
  const buttons = screen.getAllByRole("button");
  expect(title).toBeInTheDocument();
  expect(buttons[0], /iIngresar 🏀/i);
  expect(buttons[1], /Volver ⛹️‍♂️/);
});
test("muestra el formulario de Logeo ", () => {
  renderWithRouter();
  const form = screen.getByRole("form");
  expect(form).toBeInTheDocument();
  const inputNode = screen.getByLabelText(/E-mail:/);
  expect(inputNode).toBeInTheDocument();
  const inputs = screen.getByRole("textbox");
  expect(inputs[0], /E-mail:/i);
  expect(inputs[1], /Contraseña:/i);
});
test("redirige automáticamente a /inicio si ya hay token (useEffect)", async () => {
  // Simulamos usuario ya logueado
  mockToken = "jwt123";
  renderWithRouter();

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/inicio");
  });
});

test("login exitoso: hace fetch, muestra éxito y llama a login del contexto", async () => {
  renderWithRouter();

  // Mock del backend
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      email: "test@x.com",
      token: "jwt123",
      username: "marcelo",
      nombre: "Marcelo",
      apellido: "Sánchez",
      posicion: "Base",
      categoria: "A",
    }),
  });

  // Completar formulario
  await userEvent.type(screen.getByLabelText(/E-mail:/i), "test@x.com");
  await userEvent.type(screen.getByLabelText(/Contraseña:/i), "123456");

  // Enviar
  await userEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

  // Verificamos que se llamó al backend correcto
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@x.com", password: "123456" }),
      })
    );
  });

  // Se llama a login(token, user)
  await waitFor(() => {
    expect(loginMock).toHaveBeenCalledWith(
      "jwt123",
      expect.objectContaining({ email: "test@x.com", username: "marcelo" })
    );
  });
});

test("login con error 401: NO llama a login y maneja el error", async () => {
  renderWithRouter();

  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: "Credenciales incorrectas" }),
  });

  await userEvent.type(screen.getByLabelText(/E-mail:/i), "bad@x.com");
  await userEvent.type(screen.getByLabelText(/Contraseña:/i), "wrong");
  await userEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

  await waitFor(() => {
    expect(loginMock).not.toHaveBeenCalled();
  });
});
