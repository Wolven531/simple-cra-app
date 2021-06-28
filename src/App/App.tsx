import { Container, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApiContextProvider } from '../ApiContext'
import {
	AppTitleContextConsumer,
	AppTitleContextProvider,
} from '../AppTitleContext'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { Footer } from '../Footer/Footer'
import { IconDemo } from '../IconDemo'
import { Nav } from '../Nav/Nav'
import { PageNotFoundPage } from '../PageNotFoundPage/PageNotFoundPage'
import './App.css'

function App() {
	return (
		<ApiContextProvider>
			<AppTitleContextProvider>
				<Nav />
				<Container maxWidth="sm" className="app">
					<BrowserRouter>
						{/* Content outside of <Switch> renders on every page */}
						<Switch>
							<Route path="/" exact>
								{/* Home page */}
								<AppTitleContextConsumer>
									{(context) => {
										context.setTitle('Home')

										return (
											<Container>
												<Typography
													variant="body1"
													align="center"
													gutterBottom
												>
													Welcome to our next
													generation League compare
													app!
												</Typography>
											</Container>
										)
									}}
								</AppTitleContextConsumer>
							</Route>
							<Route path="/config">
								<ConfigPage />
							</Route>
							<Route path="/icons">
								{/* Icon demo page */}
								<IconDemo />
							</Route>
							<Route path="/">
								<PageNotFoundPage />
							</Route>
						</Switch>
					</BrowserRouter>
					<Footer />
				</Container>
			</AppTitleContextProvider>
		</ApiContextProvider>
	)
}

export default App
