import { Grid, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import PageNotFoundImage from './PageNotFound.jpg'
import { AppTitleContextConsumer } from '../AppTitleContext'
import './PageNotFoundPage.css'

const PageNotFoundPage: FC = () => {
	return (
		<AppTitleContextConsumer>
			{(context) => {
				context.setTitle('Page Not Found')

				return (
					<Grid
						container
						alignItems="center"
						justify="center"
						className="page-not-found"
					>
						<Grid item>
							<Typography
								variant="h5"
								align="center"
								color="error"
								gutterBottom
							>
								Page not found. How did you even get here?
							</Typography>
						</Grid>
						<img
							src={PageNotFoundImage}
							width="300"
							height="400"
							alt="pile of question marks"
						/>
					</Grid>
				)
			}}
		</AppTitleContextConsumer>
	)
}

export { PageNotFoundPage }
