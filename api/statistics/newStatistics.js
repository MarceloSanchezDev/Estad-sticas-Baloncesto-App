import { StatisticsModel } from '../models/turso/userStatics.js';
import { validStatistic } from '../schema/userSchema.js';
   const formula = (lanzados, encestados) => {
    if (lanzados === 0) return "0%";
    return ((encestados / lanzados) * 100).toFixed(2) + "%";
  };
export default async function handler(req, res) {
    try {
        const {statistic, username} = req.body
        if (!statistic || !username) {
            return res.status(400).json({ error: "Datos incompletos" });
          }
          const{ lanzamientos3,
            encestados3,
            lanzamientos2,
            encestados2,
            libresLanzados,
            libresEncestados,
            fecha,
            titulo,
            hora}=statistic
            const result = validStatistic({ lanzamientos3,
              encestados3,
              lanzamientos2,
              encestados2,
              libresLanzados,
              libresEncestados,
              fecha,
              titulo,
              hora});
              if (!result || !result.data) {
                console.warn("⚠️ Datos de estadistica inválidos");
                return res.status(400).json({ error: "Datos de estadistica inválidos" });
            }
            const porcentaje2Puntos = formula(lanzamientos2,encestados2);
            const porcentaje3Puntos = formula(lanzamientos3,encestados3);
            const porcentajeLibres = formula(libresLanzados,libresEncestados);
        const statValid = await StatisticsModel.createStatistics({ lanzamientos3,
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
             username}) 
            
            return res.status(200).json({
              statValid
              });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
}
