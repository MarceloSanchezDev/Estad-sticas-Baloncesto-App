// src/components/NewStatistic/NewStatistic.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach, afterEach, expect, test, describe } from "vitest";
import React from "react";

/** ---------- HOISTED SHARED MOCKS ---------- */
const { swalFire, tokenRef, userRef } = vi.hoisted(() => ({
  swalFire: vi.fn(() => Promise.resolve({})),
  tokenRef: { value: "jwt123" }, // se puede mutar en beforeEach
  userRef: { value: { username: "marcelo" } }, // idem
}));

/** ---------- MODULE MOCKS (se evalúan con hoisting) ---------- */

// SweetAlert2 (usa la función hoisted)
vi.mock("sweetalert2", () => ({
  __esModule: true,
  default: { fire: swalFire },
  fire: swalFire,
}));

// react-router (tu componente importa desde "react-router")
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => mockNavigate };
});

// AuthContext (lee refs hoisted para que reflejen cambios del beforeEach)
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: tokenRef.value, user: userRef.value }),
}));

// Chart.js / react-chartjs-2 (evitamos canvas real)
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
vi.mock("react-chartjs-2", () => ({
  __esModule: true,
  Bar: () => <div data-testid="bar-chart" />,
  Pie: () => <div data-testid="pie-chart" />,
  Doughnut: () => <div data-testid="doughnut-chart" />,
}));

/** ---------- IMPORT DEL COMPONENTE (después de los mocks) ---------- */
import NewStatistic from "./NewStatistic.jsx";

/** ---------- DATE FIX ---------- */
const RealDate = Date;
const FIXED = new Date("2024-03-05T12:34:56Z");
beforeEach(() => {
  global.Date = class extends RealDate {
    constructor(...args) {
      if (!args.length) return new RealDate(FIXED);
      return new RealDate(...args);
    }
    static now() {
      return FIXED.getTime();
    }
  };

  // reset por test
  mockNavigate.mockClear();
  swalFire.mockClear();
  tokenRef.value = "jwt123";
  userRef.value = { username: "marcelo" };
  global.fetch = vi.fn();
});

afterEach(() => {
  global.Date = RealDate;
  vi.clearAllMocks();
});

/** ---------- TESTS ---------- */
describe("<newStatistic />", () => {
  test("sin token redirige a /", async () => {
    tokenRef.value = null; // no logueado
    render(<NewStatistic />);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("envía el formulario OK: hace fetch, Swal success y muestra resumen", async () => {
    render(<NewStatistic />);

    await userEvent.type(
      screen.getByLabelText(/Nombre de la Estadistica/i),
      "Partido vs Rivales"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 3 lanzados/i),
      "25"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 3 encestados/i),
      "10"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 2 lanzados/i),
      "50"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 2 encestados/i),
      "30"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos libres lanzados/i),
      "20"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos libres encestados/i),
      "15"
    );

    // backend OK
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ statValid: { id: "abc" } }),
    });

    await userEvent.click(
      screen.getByRole("button", { name: /crear nueva estadistica/i })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "/api/statistics/create",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
    });

    // body enviado
    const [, init] = fetch.mock.calls[0];
    const sent = JSON.parse(init.body);
    expect(sent).toEqual(
      expect.objectContaining({
        username: "marcelo",
        statistic: expect.objectContaining({
          titulo: "Partido vs Rivales",
          lanzamientos3: 25,
          encestados3: 10,
          lanzamientos2: 50,
          encestados2: 30,
          libresLanzados: 20,
          libresEncestados: 15,
          fecha: "2024-03-05",
          hora: "09:34:56",
        }),
      })
    );

    // Swal success
    await waitFor(() => {
      expect(swalFire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "success" })
      );
    });

    // aparece resumen y charts mockeados
    await waitFor(() => {
      expect(screen.getByText(/Resumen de/i)).toBeInTheDocument();
      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
      expect(screen.getAllByTestId("pie-chart").length).toBeGreaterThanOrEqual(
        3
      );
      expect(
        screen.getAllByTestId("doughnut-chart").length
      ).toBeGreaterThanOrEqual(3);
    });
  });

  test("backend error: Swal error (y no crashea)", async () => {
    render(<NewStatistic />);

    // inputs mínimos
    await userEvent.type(
      screen.getByLabelText(/Nombre de la Estadistica :/i),
      "Partido fallido"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 3 lanzados :/i),
      "10"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 3 encestados :/i),
      "5"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 2 lanzados :/i),
      "20"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos de 2 encestados :/i),
      "10"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos libres lanzados :/i),
      "8"
    );
    await userEvent.type(
      screen.getByLabelText(/Cantidad de lanzamientos libres encestados :/i),
      "4"
    );

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Datos inválidos" }),
    });

    await userEvent.click(
      screen.getByRole("button", { name: /crear nueva estadistica/i })
    );

    await waitFor(() => {
      expect(swalFire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "error" })
      );
    });
  });
});
