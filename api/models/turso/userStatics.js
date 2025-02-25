import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { createClient } from '@libsql/client'

const SALT_ROUNDS = 10
const SECRET_KEY = process.env.SECRET_KEY
const DBTOKEN = process.env.DBTOKEN

const db = createClient({
  url: 'libsql://estadisticas-marcelosanchezdev.turso.io',
  authToken: DBTOKEN,
  fetchOptions: { timeout: 10000 } // 10 segundos
})
const initDB = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS USER (
        id_user VARCHAR(36) PRIMARY KEY,
        nombre VARCHAR(255),
        apellido VARCHAR(255),
        username TEXT UNIQUE,
        password VARCHAR(255),
        email VARCHAR(255)
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS user_estadisticas (
        id_stat VARCHAR(36) PRIMARY KEY,
        fecha DATE,
        estadisticasDosPuntos DECIMAL(5,2),
        estadisticasTresPuntos DECIMAL(5,2),
        user_username VARCHAR(255),
        nombreEstadistica VARCHAR(255),
        cant_dosPuntos INT(11),
        cant_tresPuntos INT(11),
        cant_dosPuntosEncestados INT(11),
        cant_tresPuntosEncestados INT(11),
        hora TIME,
        FOREIGN KEY (user_username) REFERENCES USER(username)
      )
    `);
    console.log('Tablas creadas correctamente.');
  } catch (err) {
    console.error('Error al crear las tablas:', err);
  }
};

initDB();
export class StatisticsModel {
  static async getAllStatistics ({ username }) {
    try {
      // hago la query a la base de datos para extraer todas las estadisticas
      const { rows } = await db.execute(`
        SELECT u.username, e.id_stat id , e.fecha, e.hora, e.estadisticasDosPuntos, e.estadisticasTresPuntos, e.nombreEstadistica, e.cant_dosPuntos, e.cant_tresPuntos, e.cant_dosPuntosEncestados, e.cant_tresPuntosEncestados 
FROM user u 
JOIN user_estadisticas e 
WHERE e.user_username = ? AND u.username = ?`, [username, username])
      // retonro las estadisticas
      return rows
    } catch (e) {
      // si hay algun error se envia el error
      console.log(e)
    }
  }

  static async createStatistics ({ input }, { username }) {


    // extraigo del input los porcentajes y la fecha de la estadistica
    const { nombreStat, tiroDosPuntos, tiroTresPuntos, tiroTresPuntosEncestados, tiroDosPuntosEncestados, porcentaje2Puntos, porcentaje3Puntos, fechaFormateada, horaFormateada } = input.input   // creo un uuid
    const uuidResult = crypto.randomUUID()
    try {
      // creo la query para insertar en la base de datos la nueva estadistica con la id y el input
      await db.execute(
        'INSERT INTO user_estadisticas (id_stat ,fecha, hora , estadisticasDosPuntos, estadisticasTresPuntos, user_username, nombreEstadistica, cant_dosPuntos, cant_tresPuntos, cant_dosPuntosEncestados, cant_tresPuntosEncestados ) values(?,?,?,?,?,?,?,?,?,?,?)',
        [uuidResult, fechaFormateada, horaFormateada, porcentaje2Puntos, porcentaje3Puntos, username, nombreStat, tiroDosPuntos, tiroTresPuntos, tiroDosPuntosEncestados, tiroTresPuntosEncestados])
    } catch (e) {
      // si hay algun error que envie el error
      console.log(e)
    }
    // luego me selecciona de la base de datos la nueva estadistica creada y la envia al controlador
    const { rows } = await db.execute(
      'SELECT *, id_stat FROM user_estadisticas WHERE id_stat  = ?', [uuidResult]
    )
    return rows[0]
  }

  static async delete ({ id }) {
    try {
      // busco y borro la estadistica con el id indicado en el parametro
      await db.execute(
        'DELETE FROM user_estadisticas WHERE id_stat = ?', [id]
      )
    } catch (e) {
      // si hay algun error lo muestra por consola
      console.log(e)
    }
    // busco la estadistica borrada y si se borra con exito retorna el array basio al controlador
    const { rows } = await db.execute('SELECT * FROM user_estadisticas WHERE id_stat = ? ', [id])
    if (rows.length === 1) return false
    return rows[0]
  }
}

export class UserModel {
  static async registerUser ({ input }) {
    // extraigo del input los siguientes datos
    const {
      username,
      password,
      nombre,
      apellido,
      email
    } = input

    // hasheo la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // creo un nuevo id
    const uuidResult = crypto.randomUUID()

    try {
      // inserto en la base de datos el nuevo usuario
      await db.execute(
        'INSERT INTO user (id_user, username, password, nombre, apellido, email) values(?,?,?,?,?,?)', [uuidResult, username, hashedPassword, nombre, apellido, email])
    } catch (e) {
      // si hay algun error lo envio al controlador
      console.log(e)
    }
    // devuelvo el usuario al controlador si fue un exito
    const { rows } = await db.execute(
      'SELECT *, id_user as id FROM user WHERE id_user = ?', [uuidResult]
    )
    return rows
  }

  static async login ({ input }) {
    // extraigo del input los siguientes datos
    const {
      email,
      password
    } = input
    try {
      // busco al usuario en a base de datos
      const { rows } = await db.execute('SELECT *, id_user as id FROM user WHERE email = ?', [email])
      if (rows.length === 0) { throw new Error('User not found') }
      const validatedUser = rows[0]
      // comparo  la contraseña con la hasheada
      const passwordMach = await bcrypt.compare(password, validatedUser.password)
      if (!(rows && passwordMach)) { throw new Error('credentials invalid') }
      // retorno el usuario
      return validatedUser
    } catch (e) {
      // si hay algun error lo envio al controlador
      console.log(e)
    }
  }
}
