import {
	Button,
	Container,
	Grid,
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

const SearchUsersPage: FC<SearchUsersPageProps> = ({
	initialSearchValue = '',
}) => {
	const classes = useStyles(theme)
	const context = useContext(GlobalContext)

	const [result, setResult] = useState({
		icon: '',
		level: '',
		name: '',
	})
	const [hasSearched, setHasSearched] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [searchValue, setSearchValue] = useState(initialSearchValue)

	const fireUserSearch = async (searchKey: string): Promise<void> => {
		setIsLoading(true)

		const response = await context.api.pingUserSearchEndpoint(searchKey)

		// !! must use keys as returned by server here, but can alias them as seen below
		const { name, profileIconId, summonerLevel } = response

		// TODO - can these updates be batched / performed as one?
		setResult({
			icon: profileIconId,
			level: summonerLevel,
			name,
		})
		setHasSearched(true)
		setIsLoading(false)
	}

	useEffect(() => {
		context.setTitle('Search Users Page')
	}, [context])

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
			{/* display result if search has been made ; note the ID of icon will change to image when API updates */}
			{hasSearched && (
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
							{result.name}
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
				</Container>
			)}
			{isLoading && <LoadingModal />}
		</Container>
	)
}

export { SearchUsersPage }
