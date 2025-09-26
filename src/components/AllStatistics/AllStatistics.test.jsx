import { render, screen, waitFor } from "@testing-library/react";
import { vi, beforeEach, afterEach, describe, test, expect } from "vitest";
import React from "react";

/** ---------- HOISTED refs/spies para usar dentro de vi.mock ---------- */
const { tokenRef, userRef, swalFire } = vi.hoisted(() => ({
  tokenRef: { value: "jwt123" },
  userRef: { value: { username: "marcelo" } },
  swalFire: vi.fn(() => Promise.resolve({})),
}));

/** ---------- MÓDULOS MOCKEADOS (se evalúan con hoisting) ---------- */

// sweetalert2
vi.mock("sweetalert2", () => ({
  __esModule: true,
  default: { fire: swalFire },
  fire: swalFire,
}));

// react-router (tu componente importa desde "react-router")
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  const Link = ({ to, children, ...rest }) => (
    <a href={typeof to === "string" ? to : "#"} {...rest}>
      {children}
    </a>
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link,
  };
});

// AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: tokenRef.value, user: userRef.value }),
}));

// chart.js (stub)
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

// react-chartjs-2 (Doughnut stub para aserciones)
vi.mock("react-chartjs-2", () => ({
  __esModule: true,
  Doughnut: () => <div data-testid="doughnut-chart" />,
}));

// StatLoader (stub)
vi.mock("../loaders/StatLoader", () => ({
  __esModule: true,
  default: () => <div data-testid="stat-loader" />,
}));

/** ---------- IMPORT del componente DESPUÉS de los mocks ---------- */
import AllStatistic from "./AllStatistics.jsx";

beforeEach(() => {
  mockNavigate.mockClear();
  swalFire.mockClear();
  tokenRef.value = "jwt123";
  userRef.value = { username: "marcelo" };
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("<AllStatistic />", () => {
  test("sin token → redirige a /", async () => {
    tokenRef.value = null;
    render(<AllStatistic />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("loader inicial: mientras no llega respuesta muestra 6 StatLoader", async () => {
    // dejamos el fetch colgado (o tardando)
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    render(<AllStatistic />);
    const loaders = await screen.findAllByTestId("stat-loader");
    expect(loaders).toHaveLength(6);
  });

  test("carga exitosa con datos: POST correcto, Swal success, tarjetas + doughnuts + links", async () => {
    const payload = {
      response: [
        {
          id_stat: "s1",
          nombreEstadistica: "Fecha 1",
          fecha: "2025-09-01",
          hora: "21:00:00",
          cantLibres: 10,
          cantLibresEncestados: 7,
          cant_tresPuntos: 20,
          cant_tresPuntosEncestados: 8,
          cant_dosPuntos: 30,
          cant_dosPuntosEncestados: 18,
          estadisticasTresPuntos: "40%",
          estadisticasDosPuntos: "60%",
          estadisticasLibres: "70%",
        },
        {
          id_stat: "s2",
          nombreEstadistica: "Fecha 2",
          fecha: "2025-09-10",
          hora: "20:30:00",
          cantLibres: 12,
          cantLibresEncestados: 9,
          cant_tresPuntos: 15,
          cant_tresPuntosEncestados: 6,
          cant_dosPuntos: 28,
          cant_dosPuntosEncestados: 14,
          estadisticasTresPuntos: "40%",
          estadisticasDosPuntos: "50%",
          estadisticasLibres: "75%",
        },
      ],
    };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => payload });

    render(<AllStatistic />);

    // POST correcto
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/statistics/list",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "marcelo" }),
        })
      );
    });

    // Swal success
    await waitFor(() => {
      expect(swalFire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "success" })
      );
    });

    // Títulos
    expect(await screen.findByText("Fecha 1")).toBeInTheDocument();
    expect(screen.getByText("Fecha 2")).toBeInTheDocument();

    // Fecha/hora
    expect(
      screen.getByText(/Fecha :2025-09-01 Hora :21:00:00/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Fecha :2025-09-10 Hora :20:30:00/)
    ).toBeInTheDocument();

    // Porcentajes
    expect(
      screen.getAllByText(/Porcentaje Lanzamientos de 3 puntos/i)
    ).toHaveLength(2);
    expect(screen.getAllByText(/Porcentaje de 2 puntos/i)).toHaveLength(2);
    expect(screen.getAllByText(/Porcentaje de tiro Libre/i)).toHaveLength(2);

    // Doughnut por tarjeta
    const doughs = screen.getAllByTestId("doughnut-chart");
    expect(doughs).toHaveLength(2);

    // Links
    const links = screen.getAllByRole("link", { name: /Ver Estadistica/i });
    expect(links[0]).toHaveAttribute("href", "/infoStat?StatID=s1");
    expect(links[1]).toHaveAttribute("href", "/infoStat?StatID=s2");
  });

  test("carga exitosa con lista vacía: muestra 'Aun no tienes Ninguna Estadistica'", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: [] }),
    });
    render(<AllStatistic />);

    // Esperamos a que complete la carga y cambie el branch
    expect(
      await screen.findByText(/Aun no tienes Ninguna Estadistica/i)
    ).toBeInTheDocument();

    // No debería haber charts
    expect(screen.queryByTestId("doughnut-chart")).not.toBeInTheDocument();
  });

  test("error del backend (ok=false): Swal error y permanece en loader", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "falló" }),
    });

    render(<AllStatistic />);

    await waitFor(() => {
      expect(swalFire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "error" })
      );
    });

    // Como no seteás allStatistics en error, sigues viendo el loader
    const loaders = await screen.findAllByTestId("stat-loader");
    expect(loaders).toHaveLength(6);
  });
});
