import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import React from "react";

// --- Mocks previos --- //

// 1) useNavigate (tu componente importa desde "react-router")
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => mockNavigate };
});

// 2) AuthContext → controlamos token, user y updateUser
let mockToken = "jwt123";
let mockUser = {
  nombre: "Marcelo",
  apellido: "Sánchez",
  email: "test@x.com",
  username: "marcelo",
  posicion: "Base",
  categoria: "A",
};
const updateUserMock = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    token: mockToken,
    user: mockUser,
    updateUser: updateUserMock,
  }),
}));

// 3) Imagen (asset) para evitar problemas de bundler en tests
vi.mock(
  "../../assets/unknown.jpg",
  () => ({
    __esModule: true,
    default: "unknown.jpg",
  }),
  { virtual: true }
);

// 4) Import del componente DESPUÉS de los mocks
import Profile from "./Profile.jsx";

beforeEach(() => {
  // mock fetch
  global.fetch = vi.fn();

  // reset de navigate/updateUser
  mockNavigate.mockClear();
  updateUserMock.mockClear();

  // token/user por defecto (logueado)
  mockToken = "jwt123";
  mockUser = {
    nombre: "Marcelo",
    apellido: "Sánchez",
    email: "test@x.com",
    username: "cleyt",
    posicion: "Base",
    categoria: "Primera",
  };

  // espía de sessionStorage
  vi.spyOn(window.sessionStorage.__proto__, "setItem");
  vi.spyOn(window.sessionStorage.__proto__, "removeItem");
  vi.spyOn(window.sessionStorage.__proto__, "getItem");
  vi.spyOn(window.sessionStorage.__proto__, "clear");
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("<Profile />", () => {
  test("sin token, redirige a /", async () => {
    mockToken = null;
    render(<Profile />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("renderiza los datos del usuario cuando hay token", () => {
    render(<Profile />);
    // Nombre completo
    expect(screen.getByText(/Marcelo Sánchez/i)).toBeInTheDocument();
    // Email
    expect(screen.getByText(/test@x\.com/i)).toBeInTheDocument();
    // Usuario
    expect(screen.getByText(/cleyt/i)).toBeInTheDocument();
    // Posición
    expect(screen.getByText(/Base/i)).toBeInTheDocument();
    // Categoría
    expect(screen.getByText(/Primera/i)).toBeInTheDocument();
  });

  test("editar Posicion: abre form, hace POST y actualiza user + sessionStorage", async () => {
    const { rerender } = render(<Profile />);

    // abrir edición
    const posLabel = screen.getByText(/^Posicion$/i);
    const posLi = posLabel.closest("li");
    const posEditBtn = within(posLi).getByRole("button");
    await userEvent.click(posEditBtn);

    const posInput = within(posLi).getByRole("textbox");
    await userEvent.type(posInput, "Escolta");
    const posSubmit = within(posLi).getByRole("button", { name: /editar/i });

    // respuesta del backend
    const updatedUser = { ...mockUser, posicion: "Escolta" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: updatedUser }),
    });

    await userEvent.click(posSubmit);

    // se llamó correctamente al endpoint
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/position/new",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ position: "Escolta", username: "cleyt" }),
        })
      );
    });

    // efectos colaterales
    await waitFor(() => {
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(updatedUser)
      );
      expect(updateUserMock).toHaveBeenCalledWith(updatedUser);
    });

    // 👉 actualizamos el valor que devuelve el mock de useAuth y re-renderizamos
    mockUser = updatedUser;
    rerender(<Profile />);

    // ahora sí debe verse "Escolta"
    expect(within(posLi).getByText("Escolta")).toBeInTheDocument();
  });

  test("editar Categoria: abre form, hace POST y actualiza user + sessionStorage", async () => {
    const { rerender } = render(<Profile />);

    // Bloque "Categoria"
    const catLabel = screen.getByText(/^Categoria$/i);
    const catLi = catLabel.closest("li");
    expect(catLi).toBeTruthy();

    // Botón (lápiz / X)
    const catEditBtn = within(catLi).getByRole("button");
    await userEvent.click(catEditBtn);

    // Input y submit
    const catInput = within(catLi).getByRole("textbox");
    await userEvent.type(catInput, "B");
    const catSubmit = within(catLi).getByRole("button", { name: /editar/i });

    // Mock fetch
    const updatedUser = { ...mockUser, categoria: "B" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: updatedUser }),
    });

    await userEvent.click(catSubmit);

    // Verificamos endpoint y payload correctos
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/category/new",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoria: "B", username: "cleyt" }),
        })
      );
    });

    // Efectos colaterales
    await waitFor(() => {
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify(updatedUser)
      );
      expect(updateUserMock).toHaveBeenCalledWith(updatedUser);
    });
    mockUser = updatedUser;
    rerender(<Profile />);
    // Valor actualizado visible
    expect(within(catLi).getByText("B")).toBeInTheDocument();
  });
});
