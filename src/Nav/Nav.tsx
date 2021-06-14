import { Container, Grid } from '@material-ui/core'
import React, { FC } from 'react'
import './Nav.css'

const Nav: FC = () => {
	return (
		<nav>
			<Container>
				<Grid container alignItems="center" justify="space-around">
					<Grid item>
						<a href="/">Home</a>
					</Grid>
					<Grid item>
						<a href="/config">Config</a>
					</Grid>
					<Grid item>
						<a href="/icons">Icon Demo</a>
					</Grid>
				</Grid>
			</Container>
		</nav>
	)
}

export { Nav }
