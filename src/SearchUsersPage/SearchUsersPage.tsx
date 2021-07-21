import {
	Button,
	Container,
	Grid,
	Grow,
	Link,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core'
import React, { FC, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import { LoadingModal } from '../LoadingModal/LoadingModal'
import { theme } from '../theme'
import './SearchUsersPage.css'

interface SearchUsersPageProps {
	/**
	 * Optional initial value to populate search input
	 */
	initialSearchValue?: string
}

const useStyles = makeStyles({
	errorContainer: (theme: Theme) => ({
		display: 'flex',
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
	addUserButtonContainer: (theme: Theme) => ({
		display: 'flex',
		justifyContent: 'center',
		marginBottom: theme.spacing(3),
	}),
	addUserButton: (theme: Theme) => ({
		background: theme.palette.primary.contrastText,
		border: 'solid',
		// Keep it or leave it, just Vinny playing with CSS
		textShadow: '2px 2px 8px #00FF00',
		boxShadow: '2px 2px 8px #00FF00',
	}),
	successContainer: (theme: Theme) => ({
		display: 'flex',
		justifyContent: 'center',
		marginBottom: theme.spacing(3),
	}),
})

const SearchUsersPage: FC<SearchUsersPageProps> = ({
	initialSearchValue = '',
}) => {
	const classes = useStyles(theme)
	const context = useContext(GlobalContext)

	const [result, setResult] = useState({
		icon: '',
		level: '',
		name: '',
		id: '',
	})
	const [hasSearched, setHasSearched] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [searchError, setSearchError] = useState<any>(null)
	const [searchValue, setSearchValue] = useState(initialSearchValue)
	const [addUserResult, setAddUserResult] = useState(false)

	const fireUserSearch = async (searchKey: string): Promise<void> => {
		setSearchError(null)
		setIsLoading(true)

		const response = await context.api.pingUserSearchEndpoint(
			searchKey,
			(err: any) => {
				setSearchError(err)
				setHasSearched(true)
				setIsLoading(false)
			}
		)

		if (searchError) {
			return
		}

		const { id, name, profileIconId, summonerLevel } = response

		setResult({
			icon: profileIconId,
			level: summonerLevel,
			name,
			id,
		})
		setHasSearched(true)
		setIsLoading(false)
	}

	useEffect(() => {
		context.setTitle('Search Users Page')
	}, [context])

	const addUserToServer = async (accountId: string): Promise<void> => {
		setAddUserResult(await context.api.pingAddUserEndpoint(accountId))
		setTimeout(() => {
			setAddUserResult(false)
		}, 2000)
	}

	return (
		<Container className="search-users-page">
			<Typography
				align="center"
				color="secondary"
				gutterBottom
				variant="h4"
			>
				Note - search function limited to exact name result
			</Typography>
			<Grid
				alignItems="center"
				className="api-container"
				container
				justify="center"
				spacing={2}
			>
				<Grid item>
					<input
						onChange={(e) => {
							setSearchValue(e.target.value)
						}}
						onKeyPress={(e) => {
							if (e.key !== 'Enter') {
								return
							}
							fireUserSearch(searchValue)
						}}
						placeholder="Username"
						value={searchValue}
					/>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						onClick={() => {
							fireUserSearch(searchValue)
						}}
						variant="contained"
					>
						Search
					</Button>
				</Grid>
			</Grid>
			{hasSearched && !isLoading && !!searchError && (
				<Container className={classes.errorContainer}>
					<Typography color="error">There was a problem</Typography>
				</Container>
			)}
			{/* display result if search has been made ; note the ID of icon will change to image when API updates */}
			{hasSearched && !isLoading && !searchError && (
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
							{result.icon}
						</Typography>
					</Container>
					<Container className={classes.resultRow}>
						<Typography align="left" color="primary" variant="h6">
							Name:
						</Typography>
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							<Link
								href={`/mastery/${result.id}`}
								rel="noopener noreferrer"
							>
								{result.name}
							</Link>
						</Typography>
					</Container>
					<Container className={classes.resultRow}>
						<Typography align="left" color="primary" variant="h6">
							Level:
						</Typography>
						<Typography
							align="right"
							color="secondary"
							variant="h6"
						>
							{result.level}
						</Typography>
					</Container>
					<Container fixed className={classes.addUserButtonContainer}>
						<Button
							color="primary"
							className={classes.addUserButton}
							onClick={() => {
								addUserToServer(result.id)
							}}
						>
							Add User to Server
						</Button>
					</Container>
						{addUserResult && (
							<Container className={classes.successContainer}>
								<Grow
									// direction="up"
									in={addUserResult}
									mountOnEnter
									unmountOnExit
								>
									<Typography>Success!</Typography>
								</Grow>
							</Container>
						)}
				</Container>
			)}
			{isLoading && <LoadingModal />}
		</Container>
	)
}

export { SearchUsersPage }
