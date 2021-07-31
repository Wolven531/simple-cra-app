import {
	Button,
	Container,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
} from '@material-ui/core'
import React, { FC, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import './ConfigPage.css'

export interface ConfigPageProps {
	defaultSecret?: string
	defaultToken?: string
}

const ConfigPage: FC<ConfigPageProps> = ({
	defaultSecret = '',
	defaultToken = '',
}) => {
	const { api, setTitle } = useContext(GlobalContext) // for page title and API access
	const [newToken, setNewToken] = useState(defaultToken)
	const [secret, setSecret] = useState(defaultSecret)

	const fireHealthCheck = async (): Promise<void> => {
		const msg = await api.pingApiHealthEndpoint()

		alert(msg)
	}
	const fireTokenCheck = async (): Promise<void> => {
		const isValid = await api.pingTokenCheckEndpoint()

		alert(isValid ? 'Token is valid' : 'Token is borked 🤷‍♂️')
	}
	const fireTokenUpdate = async (): Promise<void> => {
		if (newToken.length + secret.length < 2) {
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
		setTitle('Config Page')
	}, [setTitle])

	return (
		<Container className="config-page">
			<Grid
				alignItems="center"
				className="api-container"
				container
				justify="center"
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
					onClick={() => {
						fireHealthCheck()
					}}
					variant="outlined"
				>
					Server Up?
				</Button>
				<Button
					className="btn-token"
					color="secondary"
					onClick={() => {
						fireTokenCheck()
					}}
					variant="outlined"
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
							rel="noopener noreferrer"
							target="_blank"
						>
							Riot Developer Site
						</Link>
					</ListItem>
					<ListItem>
						<input
							className="input-new-token"
							onChange={(e) => {
								setNewToken(e.target.value)
							}}
							placeholder="New token"
							value={newToken}
						/>
					</ListItem>
					<ListItem>
						<input
							className="input-secret"
							onChange={(e) => {
								setSecret(e.target.value)
							}}
							placeholder="Secret"
							value={secret}
						/>
					</ListItem>
					<ListItem>
						<Button
							className="btn-update-token"
							color="primary"
							onClick={() => {
								fireTokenUpdate()
							}}
							variant="outlined"
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
