import { createContext, FC, useState } from 'react'
import { ApiService } from './services/ApiService'

const ENV_API_URL =
	process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

const context = createContext({
	api: null as unknown as ApiService,
	title: null as unknown as string,
	setApi: (newApi: any) => {},
	setTitle: (newTitle: any) => {},
})
const GlobalContextConsumer = context.Consumer

const GlobalContextProvider: FC<any> = (props: any) => {
	// NOTE - cannot use this approach sadly, 😢
	// const apiContext = useContext(ApiContext)
	// const appTitleContext = useContext(AppTitleContext)
	// const provided = {
	// 	api: apiContext.api,
	// 	setApi: apiContext.setApi,
	// 	title: appTitleContext.title,
	// 	setTitle: appTitleContext.setTitle,
	// }
	const [api, setApi] = useState(new ApiService(ENV_API_URL))
	const [title, setTitle] = useState('Default Title From useState')

	const provided = {
		api,
		setApi,
		title,
		setTitle,
	}

	return (
		<context.Provider value={provided}>{props.children}</context.Provider>
	)
}

export {
	context as GlobalContext,
	GlobalContextConsumer,
	GlobalContextProvider,
}
