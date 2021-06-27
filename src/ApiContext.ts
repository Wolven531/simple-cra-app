import React from 'react'
import { ApiService } from './services/ApiService'

const ENV_API_URL =
	process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'
const api = new ApiService(ENV_API_URL)
const ApiContext = React.createContext(api)

export { ApiContext }
