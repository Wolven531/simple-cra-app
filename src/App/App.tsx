import { Button, Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApiService } from '../services/ApiService'
import { IconDemo } from '../IconDemo'
import { Nav } from '../Nav/Nav'
import './App.css'

const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

function App() {
	const [api, setApi] = useState(new ApiService(ENV_API_URL))
	const ApiContext = React.createContext(api)
	
	useEffect(() => {
		setApi(new ApiService(ENV_API_URL))
	}, [])

	return (
		<ApiContext.Provider value={api}>
			<Container maxWidth="sm" className="app">
				<Container className="header">
					<h2>Simple CRA App</h2>
					<Nav />
				</Container>
				{/* Content outside of <BrowserRouter> renders on every page */}
				<BrowserRouter>
					<Switch>
						{/* Home page */}
						<Route path="/" exact>
							<Container>
								<p>Welcome to Anthony and Vinny's Simple CRA App®!</p>
								<Grid container alignItems="center" justify="center" style={{ margin: '0 0 1rem 0' }}>
									<Grid item>
										API
									</Grid>
									<Grid item style={{ margin: '0 1rem 0 1rem' }}>
										<input disabled readOnly value={ENV_API_URL} />
									</Grid>
								</Grid>
								<Container style={{ display: 'flex', justifyContent: 'center', }}>
									<Button
										className="btn-health"
										color="primary"
										variant="contained"
										onClick={() => { api.pingApiHealthEndpoint() }}
									>
										Server Up?
									</Button>
									<Button
										className="btn-token"
										color="secondary"
										variant="contained"
										onClick={() => { api.pingTokenCheckEndpoint() }}
									>
										Token valid?
									</Button>
								</Container>
							</Container>
						</Route>
						<Route path="/icons">
							<Container>
								<Grid container alignItems="center" justify="center">
									<Grid item>
										<IconDemo/>
									</Grid>
								</Grid>
							</Container>
						</Route>
						<Route path="/">
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
