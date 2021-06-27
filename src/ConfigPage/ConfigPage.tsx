import {
	Button,
	Container,
	Grid,
	Typography,
	Link,
	List,
	ListItem,
} from '@material-ui/core'
import React, { FC, useState, useEffect, useContext } from 'react'
import { ApiContext } from '../ApiContext'
import { AppTitleContext } from '../AppTitleContext'
import { ApiService } from '../services/ApiService'
import './ConfigPage.css'

export interface ConfigPageProps {
	defaultSecret?: string
	defaultToken?: string
}

const ConfigPage: FC<ConfigPageProps> = ({
	defaultSecret = '',
	defaultToken = '',
}) => {
	const [newToken, setNewToken] = useState(defaultToken)
	const [secret, setSecret] = useState(defaultSecret)
	const apiCtx = useContext(ApiContext)
	const [api] = useState(apiCtx)
	const { title, setTitle } = useContext(AppTitleContext)

	const fireHealthCheck = async () => {
		const msg = await api.pingApiHealthEndpoint()

		alert(msg)
	}
	const fireTokenCheck = async () => {
		const isValid = await api.pingTokenCheckEndpoint()

		alert(isValid ? 'Token is valid' : 'Token is borked 🤷‍♂️')
	}
	const fireTokenUpdate = async () => {
		if (newToken.length < 1 || secret.length < 1) {
			alert('Secret and Token are required to update token')

			return
		}
		const wasSuccessful = await api.pingTokenUpdateEndpoint(
			secret,
			newToken
		)

		alert(wasSuccessful ? 'Token updated' : 'Token update failed')
	}

	useEffect(() => {
		console.log(title)
		setTitle('Config')

		console.log(title)
	})

	return (
		<Container className="config-page">
			<Grid
				container
				alignItems="center"
				justify="center"
				className="api-container"
			>
				<Grid item>
					<Typography variant="body1" gutterBottom>
						API
					</Typography>
				</Grid>
				<Grid item>
					<input disabled readOnly value={api.apiUrl} />
				</Grid>
			</Grid>
			<Container className="center-flex">
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
			<Container className="center-flex">
				<List component="ol">
					<ListItem>
						<Typography variant="body1" gutterBottom>
							Go to Riot site, login, generate token
						</Typography>
					</ListItem>
					<ListItem>
						<Link
							href="https://developer.riotgames.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							Riot Developer Site
						</Link>
					</ListItem>
					<ListItem>
						<input
							className="input-new-token"
							value={newToken}
							onChange={(e) => {
								setNewToken(e.target.value)
							}}
							placeholder="New token"
						/>
					</ListItem>
					<ListItem>
						<input
							className="input-secret"
							value={secret}
							onChange={(e) => {
								setSecret(e.target.value)
							}}
							placeholder="Secret"
						/>
					</ListItem>
					<ListItem>
						<Button
							className="btn-update-token"
							color="primary"
							variant="contained"
							onClick={fireTokenUpdate}
						>
							Update Token
						</Button>
					</ListItem>
				</List>
			</Container>
		</Container>
	)
}

export { ConfigPage }
