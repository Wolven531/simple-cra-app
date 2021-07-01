import { Container } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApiContextConsumer, ApiContextProvider } from '../ApiContext'
import { AppTitleContextProvider } from '../AppTitleContext'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { Footer } from '../Footer/Footer'
import { HomePage } from '../HomePage/HomePage'
import { IconDemo } from '../IconDemo'
import { Nav } from '../Nav/Nav'
import { PageNotFoundPage } from '../PageNotFoundPage/PageNotFoundPage'
import { SearchUsersPage } from '../SearchUsersPage/SearchUsersPage'
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
								<HomePage />
							</Route>
							<Route path="/config">
								<ConfigPage />
							</Route>
							<Route path="/icons">
								<IconDemo />
							</Route>
							<Route path="/search-users" exact>
								<ApiContextConsumer>
									{({ api }) => <SearchUsersPage api={api} />}
								</ApiContextConsumer>
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
