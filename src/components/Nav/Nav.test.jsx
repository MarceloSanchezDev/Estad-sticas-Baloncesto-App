import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

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
const logoutMock = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ logout: logoutMock }),
}));
afterEach(() => {
  vi.resetAllMocks();
});
import Nav from "./Nav.jsx";
function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Nav />
    </MemoryRouter>
  );
}
beforeEach(() => {
  mockNavigate.mockClear();
  logoutMock.mockClear();
});

afterEach(() => {
  vi.resetAllMocks();
});
vi.mock("sweetalert2", () => {
  const fire = vi.fn(() => Promise.resolve({ isConfirmed: true }));
  return {
    __esModule: true,
    default: { fire },
    fire, // por si lo importás con nombre
  };
});

test("muestra el Navegador y los Botones de navegacion", () => {
  renderWithRouter();
  const nav = screen.getByRole("navigation");
  expect(nav).toBeInTheDocument();
  const buttons = screen.getAllByRole("button");
  expect(buttons[1], /Inicio/i);
  expect(buttons[2], /Perfil/i);
  expect(buttons[3], /Nueva Estadística/i);
  expect(buttons[4], /Todas Las Estadísticas/i);
  expect(buttons[5], /Porcentaje Total/i);
  expect(buttons[6], /Cerrar Sesion/i);
});

test("Al hacer click en el boton 'Inicio' navega al 'Inicio'", async () => {
  renderWithRouter();

  const buttons = screen.getAllByRole("button");
  const bottonInicio = buttons[1];
  expect(bottonInicio, /Inicio/i);
  await userEvent.click(bottonInicio);
  expect(mockNavigate).toHaveBeenCalledWith("/inicio");
});
test("Al hacer click en el boton 'Perfil' navega al 'Perfil'", async () => {
  renderWithRouter();

  const buttons = screen.getAllByRole("button");
  const bottonPerfil = buttons[2];
  expect(bottonPerfil, /Perfil/i);
  await userEvent.click(bottonPerfil);
  expect(mockNavigate).toHaveBeenCalledWith("/profile");
});
test("Al hacer click en el boton 'Nueva Estadística' navega al 'Nueva Estadística'", async () => {
  renderWithRouter();

  const buttons = screen.getAllByRole("button");
  const bottonNuevaEstadistica = buttons[3];
  expect(bottonNuevaEstadistica, /Nueva Estadística/i);
  await userEvent.click(bottonNuevaEstadistica);
  expect(mockNavigate).toHaveBeenCalledWith("/newStatistic");
});
test("Al hacer click en el boton 'Todas Las Estadísticas' navega al 'Todas Las Estadísticas'", async () => {
  renderWithRouter();

  const buttons = screen.getAllByRole("button");
  const bottonTodasLasEstadisticas = buttons[4];
  expect(bottonTodasLasEstadisticas, /Todas Las Estadísticas/i);
  await userEvent.click(bottonTodasLasEstadisticas);
  expect(mockNavigate).toHaveBeenCalledWith("/allStatistic");
});
test("Al hacer click en el boton 'Porcentaje Total' navega al 'Porcentaje Total'", async () => {
  renderWithRouter();

  const buttons = screen.getAllByRole("button");
  const bottonPorcentajeTotal = buttons[5];
  expect(bottonPorcentajeTotal, /Porcentaje/i);
  await userEvent.click(bottonPorcentajeTotal);
  expect(mockNavigate).toHaveBeenCalledWith("/allStatisticPercentage");
});
test("Al hacer click en el boton 'Cerrar Sesion' navega al 'home'", async () => {
  renderWithRouter();

  const buttons = screen.getAllByRole("button");
  const bottonCerrarSesion = buttons[6];
  expect(bottonCerrarSesion, /Cerrar Sesion/i);
  await userEvent.click(bottonCerrarSesion);

  expect(logoutMock).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
