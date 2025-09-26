import { render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";

// --- Mocks necesarios --- //
// Capturamos las props que recibe <Pie /> para asertar los datos
let lastPieProps;

vi.mock("react-chartjs-2", () => ({
  __esModule: true,
  Pie: (props) => {
    lastPieProps = props;
    return <div data-testid="pie-chart" />;
  },
}));

// Mock de chart.js para evitar side-effects y canvas
vi.mock("chart.js", () => {
  const register = vi.fn();
  return {
    __esModule: true,
    Chart: { register }, // se importa como "Chart as ChartJS" y luego usan ChartJS.register(...)
    CategoryScale: {},
    LinearScale: {},
    BarElement: {},
    ArcElement: {},
    Title: {},
    Tooltip: {},
    Legend: {},
  };
});

// Mock de Loader para ubicarlo fácil
vi.mock("../loaders/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader" />,
}));

import StatInit from "./StatInit";

beforeEach(() => {
  lastPieProps = undefined;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("<StatInit />", () => {
  test("cuando info es undefined/null, muestra el estado de carga (2 loaders) y título en <h2>", () => {
    render(<StatInit titulo="Lanzamientos de prueba" info={null} />);

    // El branch "loading" en tu componente usa <h2>
    expect(
      screen.getByRole("heading", { name: /Lanzamientos de prueba/i, level: 2 })
    ).toBeInTheDocument();

    const loaders = screen.getAllByTestId("loader");
    expect(loaders).toHaveLength(2);

    // No debe existir el gráfico
    expect(screen.queryByTestId("pie-chart")).toBeNull();
  });

  test("cuando info = [0, 0], muestra ceros y NO renderiza Pie", () => {
    render(<StatInit titulo="Ceros" info={[0, 0]} />);

    // En el branch con datos, tu título es <h1>
    expect(
      screen.getByRole("heading", { name: /Ceros/i, level: 1 })
    ).toBeInTheDocument();

    // Texto de las cajas
    expect(screen.getByText(/Lanzamientos Encestados/i)).toBeInTheDocument();
    expect(screen.getByText(/Lanzamientos Totales/i)).toBeInTheDocument();

    // Debe mostrar "0" en ambos contadores
    // Ojo: hay varios "0", así que validamos que aparezcan al menos 2 veces
    const zeros = screen.getAllByText("0");
    expect(zeros.length).toBeGreaterThanOrEqual(2);

    // No debe haber Pie si info[0] o info[1] son falsy
    expect(screen.queryByTestId("pie-chart")).toBeNull();
  });

  test("cuando info = [3, 10], renderiza números y el Pie con los datos correctos", () => {
    render(<StatInit titulo="Con datos" info={[3, 10]} />);

    // Título en <h1>
    expect(
      screen.getByRole("heading", { name: /Con datos/i, level: 1 })
    ).toBeInTheDocument();

    // Números en las cajas
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    // Se debe renderizar el Pie
    const pie = screen.getByTestId("pie-chart");
    expect(pie).toBeInTheDocument();

    // Verificamos que las props que recibió <Pie /> contengan los datos [3,10]
    expect(lastPieProps).toBeDefined();
    expect(lastPieProps.data).toBeDefined();
    expect(lastPieProps.data.datasets).toBeDefined();
    expect(Array.isArray(lastPieProps.data.datasets)).toBe(true);
    expect(lastPieProps.data.datasets[0].data).toEqual([3, 10]);

    // También podés verificar labels si querés:
    expect(lastPieProps.data.labels).toEqual(["Encestados", "Fallados"]);
  });
});
