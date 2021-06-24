import { Grid, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import PageNotFoundImage from './PageNotFound.jpg'
import './PageNotFoundPage.css'

const PageNotFoundPage: FC = () => {
	return (
		<Grid container alignItems="center" justify="center">
			<Grid item>
				<Typography variant="h3">
					Page not found. How did you even get here?
				</Typography>
			</Grid>
			<img src={PageNotFoundImage} width="300" height="400" alt="pile of question marks" />
		</Grid>
	)
}

export { PageNotFoundPage }

