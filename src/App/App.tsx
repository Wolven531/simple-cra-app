import { Container } from '@material-ui/core'
import { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ChampInfo } from '../ChampInfo/ChampInfo'
import { ComparePage } from '../ComparePage/ComparePage'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { DisplayChampsPage } from '../DisplayChampsPage/DisplayChampsPage'
import { DisplayUsersPage } from '../DisplayUsersPage/DisplayUsersPage'
import { Footer } from '../Footer/Footer'
import { GlobalContextProvider } from '../GlobalContext'
import { HomePage } from '../HomePage/HomePage'
import { IconDemo } from '../IconDemo'
import { MasteryPage } from '../MasteryPage/MasteryPage'
import { Nav } from '../Nav/Nav'
import { PageNotFoundPage } from '../PageNotFoundPage/PageNotFoundPage'
import { SearchUsersPage } from '../SearchUsersPage/SearchUsersPage'
import { UserStatsPage } from '../UserStatsPage/UserStatsPage'
import './App.css'

const App: FC = () => {
	return (
		<GlobalContextProvider>
			<BrowserRouter>
				<Nav />
				<Container maxWidth="lg" className="app">
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
						<Route path="/search" exact>
							<SearchUsersPage />
						</Route>
						<Route path="/users" exact>
							<DisplayUsersPage />
						</Route>
						<Route path="/mastery/:id" exact>
							<MasteryPage />
						</Route>
						<Route path="/stats/summary/:id/:games" exact>
							<UserStatsPage />
						</Route>
						<Route path="/compare" exact>
							<ComparePage />
						</Route>
						<Route path="/champs" exact>
							<DisplayChampsPage />
						</Route>
						<Route path="/champInfo/:champId" exact>
							<ChampInfo />
						</Route>
						<Route path="/">
							<PageNotFoundPage />
						</Route>
					</Switch>
					<Footer />
				</Container>
			</BrowserRouter>
		</GlobalContextProvider>
	)
}

export { App }
