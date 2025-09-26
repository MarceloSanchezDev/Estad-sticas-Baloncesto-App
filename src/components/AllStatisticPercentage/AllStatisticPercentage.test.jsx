import { render, screen, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, test, expect } from "vitest";
import React from "react";

/** ---------- Refs hoisted para usar dentro de vi.mock ---------- */
const { tokenRef, userRef } = vi.hoisted(() => ({
  tokenRef: { value: "jwt123" },
  userRef: { value: { username: "marcelo" } },
}));

/** ---------- Mocks de módulos (con hoisting) ---------- */

// react-router (tu componente importa desde "react-router")
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => mockNavigate };
});

// AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: tokenRef.value, user: userRef.value }),
}));

// chart.js (stub para evitar canvas real)
vi.mock("chart.js", () => ({
  __esModule: true,
  Chart: { register: vi.fn() },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  ArcElement: {},
  Title: {},
  Tooltip: {},
  Legend: {},
}));

// react-chartjs-2 (mock Doughnut)
vi.mock("react-chartjs-2", () => ({
  __esModule: true,
  Doughnut: () => <div data-testid="doughnut-chart" />,
}));

/** ---------- Import del componente DESPUÉS de los mocks ---------- */
import AllStatisticPercentage from "./AllStatisticPercentage.jsx";

beforeEach(() => {
  mockNavigate.mockClear();
  tokenRef.value = "jwt123";
  userRef.value = { username: "marcelo" };
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("<AllStatisticPercentage />", () => {
  test("sin token → redirige a /", async () => {
    tokenRef.value = null;
    render(<AllStatisticPercentage />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("loader inicial: muestra spinner mientras no llega respuesta", async () => {
    // Dejar fetch colgado para ver el loader
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    render(<AllStatisticPercentage />);
    // Spinner + texto "Cargando..."
    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });

  test("carga OK: hace POST con username, muestra Doughnut, % y totales", async () => {
    const payload = {
      response: [
        {
          total_encestados: 55,
          total_tiros: 100,
        },
      ],
    };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => payload });

    render(<AllStatisticPercentage />);

    // POST correcto
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/statistics/percentages",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "marcelo" }),
        })
      );
    });

    // Render principal con 1 doughnut
    const doughs = await screen.findAllByTestId("doughnut-chart");
    expect(doughs).toHaveLength(1);

    // Porcentaje calculado (55.00%)
    expect(
      screen.getByText(/Estadistica de Tiro\s*:\s*55\.00%/i)
    ).toBeInTheDocument();

    // Totales
    expect(screen.getByText(/Total Lanzados : 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Encestados : 55/i)).toBeInTheDocument();
  });

  test("carga con totales 0: muestra branch alternativo con ceros", async () => {
    const payload = { response: [{ total_encestados: 0, total_tiros: 0 }] };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => payload });

    render(<AllStatisticPercentage />);

    // Aparece el bloque de ceros
    expect(
      await screen.findByText(/Estadistica de Tiro\s*:\s*0/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Total Lanzados : 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Encestados : 0/i)).toBeInTheDocument();

    // Sin charts (porque también puede renderizar, pero nuestro mock igual existiría).
    // Si quieres ser estricto y NO renderizar gráfico en 0, descomenta:
    // expect(screen.queryByTestId("doughnut-chart")).not.toBeInTheDocument();
  });
});
