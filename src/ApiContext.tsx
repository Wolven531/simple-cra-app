import React, { createContext, FC, useState } from 'react'
import { ApiService } from './services/ApiService'

const ENV_API_URL =
	process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

const { Provider, Consumer } = createContext({
	setApi: (newApi: ApiService) => {},
	api: new ApiService(),
})

const ApiContextProvider: FC<any> = (props: any) => {
	const [api, setApi] = useState(new ApiService(ENV_API_URL))

	return <Provider value={{ api, setApi }}>{props.children}</Provider>
}

export { ApiContextProvider, Consumer as ApiContextConsumer }
