import {
	Container,
	Link,
	List,
	ListItem,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import { IUser } from '../types'
import { theme } from '../theme'
import './DisplayUsersPage.css'

const useStyles = makeStyles({
	errorContainer: (theme: Theme) => ({
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(3),
	}),
	resultContainer: (theme: Theme) => ({
		marginTop: theme.spacing(3),
	}),
	resultRow: (theme: Theme) => ({
		border: '1px solid',
		borderCollapse: 'collapse',
		borderColor: theme.palette.primary.main,
		display: 'flex',
		justifyContent: 'space-between',
		// marginBottom: theme.spacing(3),
		// whiteSpace: 'nowrap',
	}),
})

const dateFormatMed = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
	timeStyle: 'medium',
})

const DisplayUsersPage: FC = () => {
	const { api, setTitle } = useContext(GlobalContext) // for page title and API access

	const classes = useStyles(theme)

	const [users, setUsers] = useState<IUser[]>([])

	// must utilize useCallback, to get version of fireGetUsers() that only updates on new inputs;
	// to be passed as a dependency to useEffect(), so it can be called within
	const fireGetUsers = useCallback(async () => {
		const userList = await api.pingGetUsersEndpoint()

		setUsers(userList)
	}, [api])

	// anything called in useEffect() and not defined in it is a dependency
	useEffect(() => {
		setTitle(`Users`)
		fireGetUsers()
	}, [fireGetUsers, setTitle])

	return (
		<Container>
			<Typography
				align="center"
				color="primary"
				gutterBottom
				variant="h2"
			>
				All Users
			</Typography>

			{users.length <= 0 && (
				<Typography align="center" color="primary" variant="h6">
					No users
				</Typography>
			)}
			{users.length > 0 &&
				users.map(
					({
						accountId,
						lastUpdated,
						masteryTotal,
						name,
						summonerId,
					}) => (
						<List
							className={classes.resultContainer}
							key={summonerId}
						>
							<ListItem className={classes.resultRow}>
								<Typography
									align="left"
									color="primary"
									variant="h6"
								>
									Name
								</Typography>
								{/* // TODO - add link to DisplayUserStats */}
								<Link
									href={`/stats/summary/${accountId}/5`}
									rel="noopener noreferrer"
								>
									<Typography
										align="right"
										color="secondary"
										variant="h6"
									>
										{name}
									</Typography>
								</Link>
							</ListItem>
							<ListItem className={classes.resultRow}>
								<Typography
									align="left"
									color="primary"
									variant="h6"
								>
									Mastery Score
								</Typography>
								<Typography
									align="right"
									color="secondary"
									variant="h6"
								>
									{masteryTotal}
								</Typography>
							</ListItem>
							<ListItem className={classes.resultRow}>
								<Typography
									align="left"
									color="primary"
									variant="h6"
								>
									Last Updated
								</Typography>
								<Typography
									align="right"
									color="secondary"
									variant="h6"
								>
									{dateFormatMed.format(
										Date.parse(lastUpdated)
									)}
								</Typography>
							</ListItem>
						</List>
					)
				)}
		</Container>
	)
}

export { DisplayUsersPage }
