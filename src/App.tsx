import React, { useEffect, useState } from 'react'
import { Button, Container, Grid } from '@material-ui/core'
import { ApiService } from './ApiService'
// import { IconDemo } from './IconDemo'
import './App.css'

const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

function App() {
	const [api, setApi] = useState(new ApiService(ENV_API_URL))
	const ApiContext = React.createContext(api)
	
	useEffect(() => {
		setApi(new ApiService(ENV_API_URL))
	}, [])

	return (
		<ApiContext.Provider value={api}>
			<Container maxWidth="sm" className="app">
				<Container className="header">
					<h2>Simple CRA App</h2>
				</Container>
				<Container>
					<p>Welcome to Anthony and Vinny's Simple CRA App®!</p>
					<Grid container alignItems="center" justify="center" style={{ margin: '0 0 1rem 0' }}>
						<Grid item>
							API
						</Grid>
						<Grid item style={{ margin: '0 1rem 0 1rem' }}>
							<input disabled readOnly value={ENV_API_URL} />
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
					{/* <IconDemo/> */}
				</Container>
				<Container className="footer">
					Anthony Williams, Vincent Leighton
					<br/>
					© 2021, Most rights reserved
				</Container>
			</Container>
		</ApiContext.Provider>
	)
}

export default App
