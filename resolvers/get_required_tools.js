import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()
let key = process.env.API_KEY

export { key, fetch }