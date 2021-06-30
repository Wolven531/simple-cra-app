import { Container, Grid, Link } from '@material-ui/core'
import React, { FC } from 'react'
import './Nav.css'

const Nav: FC = () => {
	return (
		<nav>
			<Container>
				<Grid container alignItems="center" justify="space-around">
					<Grid item>
						<Link href="/">Home</Link>
					</Grid>
					<Grid item>
						<Link href="/search-users">Search Users</Link>
					</Grid>
					<Grid item>
						<Link href="/config">Config</Link>
					</Grid>
					<Grid item>
						<Link href="/icons">Icon Demo</Link>
					</Grid>
				</Grid>
			</Container>
		</nav>
	)
}

export { Nav }
