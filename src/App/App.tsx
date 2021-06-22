import { Container, CssBaseline, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { IconDemo } from '../IconDemo'
import { Nav } from '../Nav/Nav'
import { ApiService } from '../services/ApiService'
import './App.css'

function App() {
	const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

	const [api, setApi] = useState(new ApiService(ENV_API_URL))
	const ApiContext = React.createContext(api)
	
	useEffect(() => {
		setApi(new ApiService(ENV_API_URL))
	}, [ENV_API_URL])

	return (
		<ApiContext.Provider value={api}>
			<CssBaseline />
			<Container maxWidth="sm" className="app">
				<BrowserRouter>
					<Container className="header">
						<h2>Simple CRA App</h2>
						<Nav />
					</Container>
					{/* Content outside of <Switch> renders on every page */}
					<Switch>
						<Route path="/" exact>{/* Home page */}
							<Container>
								<p>Welcome to Anthony and Vinny's Simple CRA App®!</p>
							</Container>
						</Route>
						<Route path="/config">{/* Config page */}
							<ConfigPage api={api}></ConfigPage>
						</Route>
						<Route path="/icons">{/* Icon demo page */}
							<Container>
								<Grid container alignItems="center" justify="center">
									<Grid item>
										<IconDemo/>
									</Grid>
								</Grid>
							</Container>
						</Route>
						<Route path="/">{/* Not Found page */}
							<Container>
								<Grid container alignItems="center" justify="center">
									<Grid item>
										<h3>Page not found</h3>
									</Grid>
								</Grid>
							</Container>
						</Route>
					</Switch>
				</BrowserRouter>
				<Container className="footer">
					Anthony Williams, Vincent Leighton
					<br/>
					© 2021, Most rights reserved
				</Container>
			</Container>
		</ApiContext.Provider>
	)
}

export default App
