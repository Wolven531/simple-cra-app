//import { Container, Grid } from '@material-ui/core'
//import { Link } from 'react-router-dom'
import {} from '@material/top-app-bar'
import React, { FC } from 'react'
import './Nav.css'

const Nav: FC = () => {
	return (
		<nav>
			<header className="mdc-top-app-bar">
				<div className="mdc-top-app-bar__row">
					<section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
						<button
							className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
							aria-label="Open navigation menu"
						>
							menu
						</button>
						<span className="mdc-top-app-bar__title">
							Page title
						</span>
					</section>
				</div>
			</header>

			{/* <Container>
				<Grid container alignItems="center" justify="space-around">
					<Grid item>
						<Link href="/">Home</Link>
					</Grid>
					<Grid item>
						<Link href="/config">Config</Link>
					</Grid>
					<Grid item>
						<Link href="/icons">Icon Demo</Link>
					</Grid>
				</Grid>
			</Container> */}
		</nav>
	)
}

export { Nav }
