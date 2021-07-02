import React, { createContext, FC, useState } from 'react'
import { ApiService } from './services/ApiService'

const ENV_API_URL =
	process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

const context = createContext({
	setApi: (newApi: ApiService) => {},
	api: new ApiService(),
})
const ApiContextConsumer = context.Consumer

const ApiContextProvider: FC<any> = (props: any) => {
	const [api, setApi] = useState(new ApiService(ENV_API_URL))

	return (
		<context.Provider value={{ api, setApi }}>
			{props.children}
		</context.Provider>
	)
}

export { context as ApiContext, ApiContextProvider, ApiContextConsumer }
