import { Container, Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav: FC = () => {
	return (
		<nav>
			<Container>
				<Grid container alignItems="center" justify="space-around">
					<Grid item>
						<Link to="/">Home</Link>
					</Grid>
					<Grid item>
						<Link to="/SearchUsers">Search Users</Link>
					</Grid>
					<Grid item>
						<Link to="/config">Config</Link>
					</Grid>
					<Grid item>
						<Link to="/icons">Icon Demo</Link>
					</Grid>
				</Grid>
			</Container>
		</nav>
	)
}

export { Nav }
