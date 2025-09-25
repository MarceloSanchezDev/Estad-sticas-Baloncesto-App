// api/index.js (ESM)
import jwt from "jsonwebtoken";
import {
  validUser,
  validRegisterUser,
  validStatistic,
} from "../lib/schema/userSchema.js";
import { StatisticsModel, UserModel } from "../lib/models/turso/userStatics.js";

const SECRET_KEY = process.env.JWT_SECRET || "change-me";

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

const formula = (lanzados, encestados) => {
  if (lanzados === 0) return "0%";
  return ((encestados / lanzados) * 100).toFixed(2) + "%";
};

function enableCORS(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return true;
  }
  return false;
}

// Fallback para leer JSON body en ESM/Node serverless
async function getBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return null;
  if (req.body && typeof req.body === "object") return req.body;
  let raw = "";
  for await (const chunk of req) raw += chunk;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  try {
    if (enableCORS(req, res)) return;

    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = fullUrl.pathname.replace(/^\/api/, "") || "/";
    const method = req.method;
    const body = (await getBody(req)) || {};

    // Salud
    if (method === "GET" && pathname === "/") {
      return send(res, 200, { message: "Estadísticas de baloncesto" });
    }

    // ===== AUTH =====
    if (method === "POST" && pathname === "/auth/login") {
      const { email, password } = body;
      const result =
        typeof validUser === "function" ? validUser({ email, password }) : null;
      if (!result || !result.data)
        return send(res, 400, { error: "Datos de usuario inválidos" });

      const userValid = await UserModel.login({ input: result.data });
      if (!userValid)
        return send(res, 401, { error: "Credenciales incorrectas" });

      const {
        email: userEmail,
        id,
        apellido,
        nombre,
        username,
        posicion,
        categoria,
      } = userValid;
      const token = jwt.sign({ id, email: userEmail }, SECRET_KEY, {
        expiresIn: "2 days",
      });
      return send(res, 200, {
        email: userEmail,
        token,
        apellido,
        nombre,
        username,
        posicion,
        categoria,
      });
    }

    if (method === "POST" && pathname === "/auth/register") {
      const result =
        typeof validRegisterUser === "function"
          ? validRegisterUser(body)
          : null;
      if (!result || !result.data)
        return send(res, 400, { error: "Datos de registro inválidos" });

      const userValid = await UserModel.registerUser({ input: result.data });
      if (!userValid || userValid.length === 0)
        return send(res, 400, { error: "Error al registrar el usuario" });

      const { username, nombre, apellido, id, posicion, categoria, email } =
        userValid[0];
      const token = jwt.sign({ id, username }, SECRET_KEY, {
        expiresIn: 60 * 60,
      });
      return send(res, 200, {
        email,
        token,
        apellido,
        nombre,
        username,
        posicion,
        categoria,
      });
    }

    // ===== CATEGORY =====
    if (method === "POST" && pathname === "/category/new") {
      const { categoria, username } = body;
      const result = await UserModel.newCategory({
        input: { categoria, username },
      });
      return send(res, 200, {
        mensaje: "Categoria creada correctamente",
        result,
      });
    }

    // ===== STATISTICS =====
    if (method === "POST" && pathname === "/statistics") {
      const { username } = body;
      const response = await StatisticsModel.getAllInfo(username);
      if (!response) return send(res, 400, { error: "Error" });
      return send(res, 200, { response });
    }

    if (method === "POST" && pathname === "/statistics/percentages") {
      const { username } = body;
      const response = await StatisticsModel.getAllPorcentages(username);
      if (!response) return send(res, 400, { error: "Error" });
      return send(res, 200, { response });
    }

    if (method === "POST" && pathname === "/statistics/list") {
      const { username } = body;
      const response = await StatisticsModel.getAllStatistics(username);
      if (!response) return send(res, 400, { error: "Error" });
      return send(res, 200, { response });
    }

    // GET /api/statistics/:statID
    if (method === "GET" && /^\/statistics\/[^/]+$/.test(pathname)) {
      const statID = pathname.split("/")[2];
      const response = await StatisticsModel.getStatistics(statID);
      if (!response)
        return send(res, 404, { error: "Estadística no encontrada" });
      return send(res, 200, response);
    }

    if (method === "POST" && pathname === "/statistics/create") {
      const { statistic, username } = body;
      if (!statistic || !username)
        return send(res, 400, { error: "Datos incompletos" });

      const {
        lanzamientos3,
        encestados3,
        lanzamientos2,
        encestados2,
        libresLanzados,
        libresEncestados,
        fecha,
        titulo,
        hora,
      } = statistic;

      const v =
        typeof validStatistic === "function"
          ? validStatistic({
              lanzamientos3,
              encestados3,
              lanzamientos2,
              encestados2,
              libresLanzados,
              libresEncestados,
              fecha,
              titulo,
              hora,
            })
          : null;
      if (!v || !v.data)
        return send(res, 400, { error: "Datos de estadistica inválidos" });

      const porcentaje2Puntos = formula(lanzamientos2, encestados2);
      const porcentaje3Puntos = formula(lanzamientos3, encestados3);
      const porcentajeLibres = formula(libresLanzados, libresEncestados);

      const statValid = await StatisticsModel.createStatistics({
        lanzamientos3,
        encestados3,
        lanzamientos2,
        encestados2,
        libresLanzados,
        libresEncestados,
        porcentaje2Puntos,
        porcentaje3Puntos,
        porcentajeLibres,
        fecha,
        titulo,
        hora,
        username,
      });

      return send(res, 200, { statValid });
    }

    return send(res, 404, { error: "Ruta no encontrada" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return send(res, 500, {
      error: "Error interno del servidor",
      message: error.message,
    });
  }
}
