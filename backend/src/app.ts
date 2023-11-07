import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import handleErrorMiddleware from '@middlewares/handle-error.midd'
import router from './router'

export const app = express()

//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

//rotas
app.use(router)

//middleware de errors
app.use(handleErrorMiddleware)
