import { Container, Typography } from '@material-ui/core'
import React, { useState, useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApiContext } from '../ApiContext'
import { AppTitleContext } from '../AppTitleContext'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { Footer } from '../Footer/Footer'
import { IconDemo } from '../IconDemo'
import { Nav } from '../Nav/Nav'
import { PageNotFoundPage } from '../PageNotFoundPage/PageNotFoundPage'
import './App.css'

function App() {
	const { title, setTitle } = useContext(AppTitleContext)
	const apiCtx = useContext(ApiContext)
	const [api] = useState(apiCtx)

	return (
		<ApiContext.Provider value={api}>
			<AppTitleContext.Provider value={{ title, setTitle }}>
				<Nav />
				<Container maxWidth="sm" className="app">
					<BrowserRouter>
						{/* Content outside of <Switch> renders on every page */}
						<Switch>
							<Route path="/" exact>
								{/* Home page */}
								<Container>
									<Typography
										variant="body1"
										align="center"
										gutterBottom
									>
										Welcome to our next generation League
										compare app!
									</Typography>
								</Container>
							</Route>
							<Route path="/config">
								{/* Config page */}
								<ConfigPage />
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
						<Container className="footer">
							<Typography
								variant="body2"
								align="center"
								gutterBottom
							>
								Anthony Williams, Vincent Leighton, Jonathan
								Stutson
								<br />© 2021, Most rights reserved
							</Typography>
						</Container>
						{/* Content outside of <Switch> renders on every page */}
						<Switch>
							<Route path="/" exact>
								{/* Home page */}
								<Container>
									<Typography
										variant="body1"
										align="center"
										gutterBottom
									>
										Welcome to our next generation League
										compare app!
									</Typography>
								</Container>
							</Route>
							<Route path="/config">
								{/* Config page */}
								<ConfigPage />
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
			</AppTitleContext.Provider>
		</ApiContext.Provider>
	)
}

export default App
