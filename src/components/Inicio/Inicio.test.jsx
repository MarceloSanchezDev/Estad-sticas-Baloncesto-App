import { vi, beforeEach, afterEach, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";

// 1) navigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => mockNavigate };
});

// 2) Auth
let mockToken = null;
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: mockToken }),
}));

// 3) Statistics (ajusta el path si es StatisticsContext o StatisticContext)
let mockStats = null;
vi.mock("../../context/StatisticContext", () => ({
  useStatistics: () => ({ stats: mockStats, refresh: vi.fn() }),
}));

// 4) StatInit
vi.mock("../StatInit", () => ({
  __esModule: true,
  default: ({ titulo, info }) => (
    <div data-testid="statinit">
      <span>{titulo}</span>
      <span>{Array.isArray(info) ? info.join(",") : ""}</span>
    </div>
  ),
}));

import Inicio from "./Inicio.jsx";

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={["/inicio"]}>
      <Inicio />
    </MemoryRouter>
  );

beforeEach(() => {
  mockNavigate.mockClear();
  mockToken = null;
  mockStats = null;
});

afterEach(() => {
  vi.clearAllMocks();
});

test("sin token presente, redirige a /", async () => {
  mockToken = null;
  renderWithRouter();
  // Esperamos a que el useEffect se ejecute y llame navigate
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
});
test('mientras cargada "stats" debe aparecer un loader cargando', async () => {
  mockStats = null;
  renderWithRouter();
  const loader = screen.getByRole("status");
  expect(loader).toBeInTheDocument();
});

test("con token y stats renderiza las 3 tarjetas con sus datos", async () => {
  mockToken = "jwt123";
  mockStats = {
    tresTitosEncestadosTotales: 10,
    tresTirosLanzadosTotales: 25,
    dosPuntosEncestadosTotales: 30,
    dosPuntosLanzadosTotales: 50,
    LibresEncestadosTotales: 15,
    libresLanzadosTotales: 20,
  };

  renderWithRouter();

  // No debe redirigir
  await waitFor(() => {
    expect(mockNavigate).not.toHaveBeenCalledWith("/", expect.anything());
  });

  // Títulos de las 3 tarjetas
  expect(
    screen.getByRole("heading", { name: /Lanzamientos totales de 3 puntos/i, level: 1 })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Lanzamientos totales de 2 puntos/i, level: 1 })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Lanzamientos totales de Libres/i, level: 1 })
  ).toBeInTheDocument();

  // Números en las cajas
  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText("25")).toBeInTheDocument();
  expect(screen.getByText("30")).toBeInTheDocument();
  expect(screen.getByText("50")).toBeInTheDocument();
  expect(screen.getByText("15")).toBeInTheDocument();
  expect(screen.getByText("20")).toBeInTheDocument();

  // 3 gráficos (canvas con role="img")
  const charts = screen.getAllByRole("img");
  expect(charts).toHaveLength(3);
});

