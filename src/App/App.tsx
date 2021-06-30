import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Home } from '../Home/Home'
import { IconDemo } from '../IconDemo'
import { PageNotFoundPage } from '../PageNotFoundPage/PageNotFoundPage'
import { SearchUsers } from '../SearchUsers/SearchUsers'
import { ApiService } from '../services/ApiService'
import './App.css'

function App() {
	const ENV_API_URL =
		process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

	const [api, setApi] = useState(new ApiService(ENV_API_URL))
	const ApiContext = React.createContext(api)

	useEffect(() => {
		setApi(new ApiService(ENV_API_URL))
	}, [ENV_API_URL])

	return (
		<ApiContext.Provider value={api}>
			<Container maxWidth="sm" className="app">
				<BrowserRouter>
					<Header />
					{/* Content outside of <Switch> renders on every page */}
					<Switch>
						<Route path="/" exact>
							{/* Home page */}
							<Home />
						</Route>
						<Route path="/searchUsers" exact>
							{/* Search Users page */}
								<SearchUsers api={api}></SearchUsers>
						</Route>
						<Route path="/config">
							{/* Config page */}
							<ConfigPage api={api} />
						</Route>
						<Route path="/icons">
							{/* Icon demo page */}
							<IconDemo />
						</Route>
						<Route path="/">
							{/* Not Found page */}
							<PageNotFoundPage />
						</Route>
					</Switch>
				</BrowserRouter>
				<Footer />
			</Container>
		</ApiContext.Provider>
	)
}

export default App
