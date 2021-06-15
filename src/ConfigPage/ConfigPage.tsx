import { Button, Container, Grid } from '@material-ui/core'
import React, { FC } from 'react'
import { ApiService } from '../services/ApiService'
import './ConfigPage.css'

export interface ConfigPageProps {
	api: ApiService
}

const ConfigPage: FC<ConfigPageProps> = ({ api }) => {
	return (
		<Container>
			<Grid container alignItems="center" justify="center" style={{ margin: '0 0 1rem 0' }}>
				<Grid item>
					API
				</Grid>
				<Grid item style={{ margin: '0 1rem 0 1rem' }}>
					<input disabled readOnly value={api.apiUrl} />
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
	)
}

export { ConfigPage }
