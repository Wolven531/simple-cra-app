import { Button, Container, Grid } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { ApiService } from '../services/ApiService'
import './ConfigPage.css'

export interface ConfigPageProps {
	api: ApiService
}

const ConfigPage: FC<ConfigPageProps> = ({ api }) => {
	const [newToken, setNewToken] = useState('')
	const [secret, setSecret] = useState('')

	const fireHealthCheck = async () => {
		const msg = await api.pingApiHealthEndpoint()

		alert(msg)
	}
	const fireTokenCheck = async () => {
		const isValid = await api.pingTokenCheckEndpoint()

		alert(isValid ? 'Token is valid' : 'Token is borked 🤷‍♂️')
	}

	return (
		<Container className="config-page">
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
					onClick={fireHealthCheck}
				>
					Server Up?
				</Button>
				<Button
					className="btn-token"
					color="secondary"
					variant="contained"
					onClick={fireTokenCheck}
				>
					Token valid?
				</Button>
			</Container>
			<Grid container alignItems="center" justify="center" style={{ margin: '1rem 0' }}>
				<Grid item>
					<input value={newToken} onChange={e => { setNewToken(e.target.value) }} placeholder="New token" />
				</Grid>
				<Grid item style={{ margin: '0 1rem 0 1rem' }}>
					<input value={secret} onChange={e => { setSecret(e.target.value) }} placeholder="Secret" />
				</Grid>
				<Grid item style={{ margin: '0 1rem 0 1rem' }}>
					<Button
						className="btn-update-token"
						color="primary"
						variant="contained"
						onClick={() => {}}
					>
						Update Token
					</Button>
				</Grid>
			</Grid>
		</Container>
	)
}

export { ConfigPage }
