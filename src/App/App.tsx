import { Container } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { Footer } from '../Footer/Footer'
import { GlobalContextProvider } from '../GlobalContext'
import { HomePage } from '../HomePage/HomePage'
import { IconDemo } from '../IconDemo'
import { MasteryPage } from '../MasteryPage/MasteryPage'
import { Nav } from '../Nav/Nav'
import { PageNotFoundPage } from '../PageNotFoundPage/PageNotFoundPage'
import { SearchUsersPage } from '../SearchUsersPage/SearchUsersPage'
import './App.css'

function App() {
	return (
		<GlobalContextProvider>
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
							<SearchUsersPage />
						</Route>
						<Route path="/mastery/:id" exact>
							<MasteryPage />
						</Route>
						<Route path="/">
							<PageNotFoundPage />
						</Route>
					</Switch>
				</BrowserRouter>
				<Footer />
			</Container>
		</GlobalContextProvider>
	)
}

export default App
