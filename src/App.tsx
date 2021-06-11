import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { IconDemo } from './IconDemo'
import './App.css'

const ENV_API_URL = process.env.REACT_APP_API_URL || '!!! ENV WAS MISSING URL !!!'

function App() {
	return (
		<Grid container className="app">
			<Grid item xs={12} className="header">
				<h2>Simple CRA App</h2>
			</Grid>
			<Grid item xs={12}>
				<p>Welcome to Anthony and Vinny's Simple CRA App®!</p>
			</Grid>
			<Grid item xs={12}>
				<Grid container alignItems="center">
					<Grid item>
						API
					</Grid>
					<Grid item style={{ margin: '0 1rem 0 1rem' }}>
						<input disabled readOnly value={ENV_API_URL} style={{ }} />
					</Grid>
					<Grid item>
						<Button color="primary" variant="outlined" style={{ }}>Test</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<IconDemo/>
			</Grid>
			<Grid item xs={12} className="footer">
				Anthony Williams, Vincent Leighton
				<br/>
				© 2021, Most rights reserved but available upon request
			</Grid>
		</Grid>
	)
}

export default App
