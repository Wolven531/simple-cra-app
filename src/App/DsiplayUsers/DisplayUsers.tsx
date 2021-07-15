import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import { theme } from '../../theme'
import { GetUsersEndpointResult } from '../../services/ApiService'
import { FormatAlignJustify } from '@material-ui/icons'

function DisplayUsers() {
	const { api, setTitle } = useContext(GlobalContext) // for page title and API access

	const useStyles = makeStyles({
		errorContainer: (theme: Theme) => ({
			display: 'flex',
			justifyContent: 'center',
			marginTop: theme.spacing(3),
		}),
		resultContainer: (theme: Theme) => ({
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			marginTop: theme.spacing(3),
		}),
		resultRow: (theme: Theme) => ({
			alignSelf: 'stretch',
			border: '1px solid',
			borderCollapse: 'collapse',
			borderColor: theme.palette.primary.main,
			display: 'flex',
			justifyContent: 'space-between',
			marginBottom: theme.spacing(3),
		}),
		resultTitle: (theme: Theme) => ({
			whitespace: 'nowrap'
		}),
	})
	const classes = useStyles(theme)

	const [users, setResult] = useState<GetUsersEndpointResult[]>([])

	const fireGetUsers = async (): Promise<void> => {
		const userList = await api.pingGetUsersEndpoint()
        console.log(userList);
        
		setResult(userList)
	}
    console.log(users);
    
	useEffect(() => {
		setTitle(`Users`)
		fireGetUsers()
	}, [])

	return (
		<Container className="user-data-container">
			<Typography
				align="center"
				color="primary"
				gutterBottom
				variant="h2"
			>
				All Users
			</Typography>

			{users.map((user) => (
                <Container className={classes.resultContainer} key={user.summonerId}>
					<Container className={classes.resultRow}>
						<Typography align="left" color="primary" variant="h6">
							Name:
						</Typography>
						{/* Add link to DisplayUserStats */}
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							{user.name}
						</Typography>
					</Container>
					<Container className={classes.resultRow}>
						<Typography className={classes.resultTitle} align="left" color="primary" variant="h6">
							Mastery Score:
						</Typography>
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							{user.masteryTotal}
						</Typography>
					</Container>
					<Container className={classes.resultRow}>
						<Typography align="left" color="primary" variant="h6">
							Last Updated:
						</Typography>
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							{user.lastUpdated}
						</Typography>
					</Container>
				</Container>
			))}
		</Container>
	)
}

export default DisplayUsers
