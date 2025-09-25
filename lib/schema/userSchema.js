import { z } from 'zod'

const UserRegister = z.object({
  username: z.string({
    required_error: 'user is required',
    invalid_type_error: 'user must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  }).min(6, { message: 'Must be 6 or more characters long' }),
  name: z.string({
    invalid_type_error: 'name must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  lastname: z.string({
    invalid_type_error: 'lastName must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string'
  }).email().min(6, { message: 'Must be 6 or more characters long' })
})
const UserLogin = z.object({
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string'
  }).email().min(6, { message: 'Must be 6 or more characters long' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  }).min(6, { message: 'Must be 6 or more characters long' })
})
const userStatistics = z.object({
  lanzamientos3: z.number({
    required_error: "Lanzamientos3 is required",
    invalid_type_error: "Lanzamientos3 must be a number",
  }).nonnegative(),
  encestados3: z.number({
    required_error: "Encestados3 is required",
    invalid_type_error: "Encestados3 must be a number",
  }).nonnegative(),
  lanzamientos2: z.number({
    required_error: "Lanzamientos2 is required",
    invalid_type_error: "Lanzamientos2 must be a number",
  }).nonnegative(),
  encestados2: z.number({
    required_error: "Encestados2 is required",
    invalid_type_error: "Encestados2 must be a number",
  }).nonnegative(),
  libresLanzados : z.number({
    required_error: "Libres is required",
    invalid_type_error: "Libres must be a number",
  }).nonnegative(),
  libresEncestados: z.number({
    required_error: "LibresE is required",
    invalid_type_error: "LibresE must be a number",
  }).nonnegative(),
  titulo:z.string({
    required_error: 'titulo is required',
    invalid_type_error: 'titulo must be a string'
  }).min(6, { message: 'Must be 6 or more characters long' }),
  fecha:z.string({
    required_error: 'fecha is required',
    invalid_type_error: 'fecha must be a string'
  }),
  hora:z.string({
    required_error: 'hora is required',
    invalid_type_error: 'hora must be a string'
  })
})
export function validUser (object) {

  return UserLogin.safeParse(object)
}
export function validRegisterUser (object) {

  return UserRegister.safeParse(object)
}
export function validStatistic(object){
  return userStatistics.safeParse(object)
}