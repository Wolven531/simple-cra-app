import {
	Button,
	Container,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
} from '@material-ui/core'
import React, { FC, useState } from 'react'
import { ApiContextConsumer } from '../ApiContext'
import { AppTitleContextConsumer } from '../AppTitleContext'
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

	const fireHealthCheck = async (api: ApiService) => {
		//Ping is returning back a undefined. Also how does apiContext get passed???
		const msg = await api.pingApiHealthEndpoint()

		alert(msg)
	}
	const fireTokenCheck = async (api: ApiService) => {
		const isValid = await api.pingTokenCheckEndpoint()

		alert(isValid ? 'Token is valid' : 'Token is borked 🤷‍♂️')
	}
	const fireTokenUpdate = async (api: ApiService) => {
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

	return (
		<ApiContextConsumer>
			{({ api }) => {
				return (
					<AppTitleContextConsumer>
						{(titleContext) => {
							titleContext.setTitle('Config Page')

							return (
								<Container className="config-page">
									<Grid
										container
										alignItems="center"
										justify="center"
										className="api-container"
									>
										<Grid item>
											<Typography
												variant="body1"
												gutterBottom
											>
												API
											</Typography>
										</Grid>
										<Grid item>
											<input
												disabled
												readOnly
												value={api.apiUrl}
											/>
										</Grid>
									</Grid>
									<Container className="center-flex">
										<Button
											className="btn-health"
											color="primary"
											variant="contained"
											onClick={() => {
												fireHealthCheck(api)
											}}
										>
											Server Up?
										</Button>
										<Button
											className="btn-token"
											color="secondary"
											variant="contained"
											onClick={() => {
												fireTokenCheck(api)
											}}
										>
											Token valid?
										</Button>
									</Container>
									<Container className="center-flex">
										<List component="ol">
											<ListItem>
												<Typography
													variant="body1"
													gutterBottom
												>
													Go to Riot site, login,
													generate token
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
														setNewToken(
															e.target.value
														)
													}}
													placeholder="New token"
												/>
											</ListItem>
											<ListItem>
												<input
													className="input-secret"
													value={secret}
													onChange={(e) => {
														setSecret(
															e.target.value
														)
													}}
													placeholder="Secret"
												/>
											</ListItem>
											<ListItem>
												<Button
													className="btn-update-token"
													color="primary"
													variant="contained"
													onClick={() => {
														fireTokenUpdate(api)
													}}
												>
													Update Token
												</Button>
											</ListItem>
										</List>
									</Container>
								</Container>
							)
						}}
					</AppTitleContextConsumer>
				)
			}}
		</ApiContextConsumer>
	)
}

export { ConfigPage }
