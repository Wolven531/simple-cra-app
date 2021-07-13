import { Container, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContextConsumer } from '../ApiContext'
import { ApiService } from '../services/ApiService'
import { theme } from '../theme'

interface DisplayTotalMasteryPageProps {
	// API and user id to search from
	// api?: (api: ApiService) => Promise<void>
	searchId?: string
	name?: string
	icon?: string
}

const useStyles = makeStyles({
	resultRow: (theme: Theme) => ({
		alignSelf: 'stretch',
		border: '1px solid',
		borderCollapse: 'collapse',
		borderColor: theme.palette.primary.main,
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: theme.spacing(3),
	}),
})

const DisplayTotalMasteryPage: FC<DisplayTotalMasteryPageProps> = ({
	// api as ApiService,
	searchId = '',
	name = '',
	icon = '',
}) => {
	//let { id } = useParams();
	
	const DEFAULT_RESPONSE = {
		totalMastery: '',
	}
	//const [result, setResult] = useState(DEFAULT_RESPONSE)
	const classes = useStyles(theme)
	// Func for giving API user id and getting total mastery


	// took out await api because it is no longer in the async function
	// ! Needs review
	//const result = api.pingUserSearchEndpoint(searchId)
	// const fireGetMastery = async (api: ApiService) =>{
	// }

	return (
		// Display user icon, username, and total mastery
		<ApiContextConsumer>
			{({ api }) => (
				<Container className="user-data-container">
					<Typography
						align="center"
						color="primary"
						gutterBottom
						variant="h5"
					>
						Results
					</Typography>
					<Container className={classes.resultRow}>
						<Typography align="left" color="primary" variant="h6">
							Icon:
						</Typography>
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							{icon}
						</Typography>
					</Container>
					<Container className={classes.resultRow}>
						{/* Add link to DIsplayTotalMastery */}
						<Typography align="left" color="primary" variant="h6">
							Name:
						</Typography>
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							{name}
						</Typography>
					</Container>
					<Container className={classes.resultRow}>
						<Typography align="left" color="primary" variant="h6">
							Total Mastery:
						</Typography>
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							{/* {api.pingMasteryTotalEndpoint(searchId)} */}
						</Typography>
					</Container>
				</Container>
			)}
		</ApiContextConsumer>
	)
}

export { DisplayTotalMasteryPage }
