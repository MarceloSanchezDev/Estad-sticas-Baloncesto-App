import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Main from "./Main.jsx";
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
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: mockToken }),
}));

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Main />
    </MemoryRouter>
  );
}
beforeEach(() => {
  mockNavigate.mockClear();
});
afterEach(() => {
  // limpiar si fuera necesario otros mocks
});

test('muestra el título "bienvenido a Estadisticas de Baloncesto" y los botones de Logeo', () => {
  renderWithRouter();
  const title = screen.getByRole("heading", {
    name: /bienvenido a Estadisticas de Baloncesto🏀⛹️‍♂️ !/i,
  });
  expect(title).toBeInTheDocument();
});

test("muestra el texto de explicacion de la app", () => {
  renderWithRouter();

  const text = screen.getByText(
    /Esta aplicación te permite visualizar estadísticas de baloncesto, enfocada en tiros de dos y tres puntos. ¡Inicia sesión o regístrate para comenzar!/i
  );
  expect(text).toBeInTheDocument();
});

test("muestra los botones de logeo Inicio De Sesion/ Registro", async () => {
  renderWithRouter();
  const buttons = screen.getAllByRole("button");
  expect(buttons[0]).toBeInTheDocument();
  expect(buttons[1]).toBeInTheDocument();

  await userEvent.click(buttons[0]);
  await userEvent.click(buttons[1]);
});
test("muestra el LOGO de la aplicacion", () => {
  renderWithRouter();
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
});

test('click en "Iniciar sesión" navega a /login (si onClick está activo)', async () => {
  renderWithRouter();
  const loginBtn = screen.getByRole("button", { name: /iniciar sesión/i });

  await userEvent.click(loginBtn);
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});

test('click en "registrarse" navega a /register (si onClick está activo)', async () => {
  renderWithRouter();
  const registerBtn = screen.getByRole("button", { name: /reg/i });

  await userEvent.click(registerBtn);
  expect(mockNavigate).toHaveBeenCalledWith("/register");
});

test("con token presente, redirige a /inicio", async () => {
  mockToken = "FAKE_TOKEN";
  renderWithRouter();
  // Esperamos a que el useEffect se ejecute y llame navigate
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/inicio"));
});
