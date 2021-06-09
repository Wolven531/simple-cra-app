import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { IconDemo } from './IconDemo'
import './App.css'

const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

function App() {
	return (
		<Grid container className="app">
			<Grid item xs={12}>
				<h2>Simple CRA App</h2>
			</Grid>
			<Grid item xs={12}>
				<p>Welcome to Anthony and Vinny's Simple CRA App®!</p>
			</Grid>
			<Grid item xs={12}>
				<Grid container style={{ marginBottom: '1rem' }}>
					<Grid item>
						API
					</Grid>
					<Grid item>
						<input disabled readOnly value={ENV_API_URL} style={{ margin: '0 0 0 0' }} />
					</Grid>
					<Grid item>
						<Button color="primary" variant="outlined" style={{ margin: '' }}>Test</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<IconDemo/>
			</Grid>
		</Grid>
	)
}

export default App
