import React from 'react'
import { Button, Container, Grid } from '@material-ui/core'
import { IconDemo } from './IconDemo'
import './App.css'

const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

function App() {
	const pingApiHealthEndpoint = () => {
		fetch(
			`${ENV_API_URL}/health`,
			{
				cache: 'no-cache',
				method: 'get',
			})
			.then(resp => resp.text())
			.then(text => { alert(text) })
			.catch(console.error)
	}

	return (
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
					<Grid item>
						<Button color="primary" variant="contained" onClick={pingApiHealthEndpoint}>Test</Button>
					</Grid>
				</Grid>
				<IconDemo/>
			</Container>
			<Container className="footer">
				Anthony Williams, Vincent Leighton
				<br/>
				© 2021, Most rights reserved
			</Container>
		</Container>
	)
}

export default App
