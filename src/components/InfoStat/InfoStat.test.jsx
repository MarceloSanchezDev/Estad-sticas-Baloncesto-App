import { render, screen, waitFor, within } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, test, expect } from "vitest";
import React from "react";

/** ---------- HOISTED REFS PARA MÓDULOS MOCKEADOS ---------- */
const { tokenRef } = vi.hoisted(() => ({
  tokenRef: { value: "jwt123" },
}));

/** ---------- MOCKS DE MÓDULOS (ANTES DEL IMPORT DEL COMPONENTE) ---------- */

// useNavigate (tu componente importa desde "react-router")
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => mockNavigate };
});

// AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: tokenRef.value }),
}));

// chart.js (evitar registro real de escalas/canvas)
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
  Doughnut: (props) => <div data-testid="doughnut-chart" />,
}));

/** ---------- IMPORT DEL COMPONENTE DESPUÉS DE LOS MOCKS ---------- */
import InfoStat from "./InfoStat.jsx";

beforeEach(() => {
  // URL con query ?StatID=abc123
  window.history.pushState({}, "", "/info?StatID=abc123");

  // fetch mock
  global.fetch = vi.fn();

  // limpieza por test
  mockNavigate.mockClear();
  tokenRef.value = "jwt123";
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("<InfoStat />", () => {
  test("sin token → redirige a /", async () => {
    tokenRef.value = null;

    render(<InfoStat />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("con token: hace fetch por statID y renderiza los datos + 4 gráficos", async () => {
    // respuesta del backend (array con un objeto, como usa tu componente)
    const payload = [
      {
        id_stat: "abc123",
        nombreEstadistica: "Clásico del Domingo",
        hora: "18:45:00",
        fecha: "2024-09-22",

        // 3 puntos
        cant_tresPuntos: 25,
        cant_tresPuntosEncestados: 10,
        estadisticasTresPuntos: "40%",

        // 2 puntos
        cant_dosPuntos: 50,
        cant_dosPuntosEncestados: 30,
        estadisticasDosPuntos: "60%",

        // libres
        cantLibres: 20,
        cantLibresEncestados: 15,
        estadisticasLibres: "75%",
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => payload,
    });

    render(<InfoStat />);

    // Se hizo fetch al endpoint correcto (usa el StatID del query string)
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/statistics/abc123");
    });

    // Título y metadatos
    expect(
      await screen.findByRole("heading", {
        name: /Informacion de la estadistica/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Clásico del Domingo/i)).toBeInTheDocument();
    expect(screen.getByText(/Hora:\s*18:45:00/i)).toBeInTheDocument();
    expect(screen.getByText(/Fecha:\s*2024-09-22/i)).toBeInTheDocument();

    // Bloque "Lanzamientos de 3 Puntos"
    const tresCardTitle = screen.getByText(/Lanzamientos de 3 Puntos/i);
    const tresCard = tresCardTitle.closest(".card");
    expect(
      within(tresCard).getByText(/Tiros Lanzados : 25/i)
    ).toBeInTheDocument();
    expect(
      within(tresCard).getByText(/Tiros Encestados : 10/i)
    ).toBeInTheDocument();
    expect(
      within(tresCard).getByText(/Porcentaje Total : 40%/i)
    ).toBeInTheDocument();

    // Bloque "Lanzamientos de 2 Puntos"
    const dosCardTitle = screen.getByText(/Lanzamientos de 2 Puntos/i);
    const dosCard = dosCardTitle.closest(".card");
    expect(
      within(dosCard).getByText(/Tiros Lanzados : 50/i)
    ).toBeInTheDocument();
    expect(
      within(dosCard).getByText(/Tiros Encestados : 30/i)
    ).toBeInTheDocument();
    expect(
      within(dosCard).getByText(/Porcentaje Total : 60%/i)
    ).toBeInTheDocument();

    // Bloque "Lanzamientos de Tiros Libres"
    const libresCardTitle = screen.getByText(/Lanzamientos de Tiros Libres/i);
    const libresCard = libresCardTitle.closest(".card");
    expect(
      within(libresCard).getByText(/Tiros Lanzados : 20/i)
    ).toBeInTheDocument();
    expect(
      within(libresCard).getByText(/Tiros Encestados : 15/i)
    ).toBeInTheDocument();
    expect(
      within(libresCard).getByText(/Porcentaje Total : 75%/i)
    ).toBeInTheDocument();

    // Bloque "Porcentaje Total de Lanzamientos"
    const totalCardTitle = screen.getByText(
      /Porcentaje Total de Lanzamientos/i
    );
    const totalCard = totalCardTitle.closest(".card");
    // totales calculados en el render
    expect(
      within(totalCard).getByText(/Tiros Lanzados :\s*95/i)
    ).toBeInTheDocument(); // 25 + 50 + 20
    expect(
      within(totalCard).getByText(/Tiros Encestados :\s*55/i)
    ).toBeInTheDocument(); // 10 + 30 + 15

    // Gráficos (Doughnut mockeado): deberían ser 4 (uno por tarjeta)
    const doughnuts = screen.getAllByTestId("doughnut-chart");
    expect(doughnuts).toHaveLength(4);
  });

  test("error del backend: muestra la vista principal (con valores vacíos) y loguea error", async () => {
    // Forzamos error en fetch
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Falla" }),
    });

    render(<InfoStat />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/statistics/abc123");
    });

    // Como info inicia en {}, el componente igualmente muestra la vista principal
    expect(
      screen.getByRole("heading", { name: /Informacion de la estadistica/i })
    ).toBeInTheDocument();

    // Se registró el error
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
