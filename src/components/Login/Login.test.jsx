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
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: mockToken }),
}));

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Login />
    </MemoryRouter>
  );
}
beforeEach(() => {
  mockNavigate.mockClear();
});
afterEach(() => {
  // limpiar si fuera necesario otros mocks
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
