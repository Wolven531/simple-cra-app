import {
	Button,
	Container,
	Grid,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core'
import { Spinner } from 'react-bootstrap'
import React, { FC, useContext, useEffect, useState } from 'react'
import { ApiContext } from '../ApiContext'
import { AppTitleContext } from '../AppTitleContext'
import { ApiService } from '../services/ApiService'
import { theme } from '../theme'
import './SearchUsersPage.css'

interface SearchUsersPageProps {
	initialSearchValue?: string
	userSearchFunc?: (
		api: ApiService,
		searchKey: string,
		updateFunc: (updatedResult: any) => void
	) => Promise<void>
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
	userSearchFunc = async (
		api: ApiService,
		searchKey: string,
		updateFunc: (updatedResult: any) => void
		) => {
			const response = await api.pingUserSearchEndpoint(searchKey)
			
			// !! must use keys as returned by server here, but can alias them as seen below
			const { name, profileIconId, summonerLevel } = response
			
			updateFunc({
				icon: profileIconId,
				level: summonerLevel,
				name,
			})
		},
	}) => {
		const DEFAULT_RESPONSE = {
			icon: '',
			level: '',
			name: '',
		}
		
		const [result, setResult] = useState(DEFAULT_RESPONSE)
		const [searchValue, setSearchValue] = useState(initialSearchValue)
		const [hasSearched, setHasSearched] = useState(false)
		const [isLoading, setIsLoading] = useState(false)
		
		const classes = useStyles(theme)

	const { api } = useContext(ApiContext)
	const context = useContext(AppTitleContext)

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
							setIsLoading(true)
							userSearchFunc(api, searchValue, setResult).then(() => {
								setHasSearched(true)
								setIsLoading(false)
							})
						}}
						placeholder="Username"
						value={searchValue}
					/>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						onClick={() => {
							setIsLoading(true)
							userSearchFunc(api, searchValue, setResult).then(() => {
								setHasSearched(true)
								setIsLoading(false)
							})
						}}
						variant="contained"
					>
						Search
						
						{isLoading &&(
							<Spinner className="loading-spinner" animation="border" variant="primary" />
						)}
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
		</Container>
	)
}

export { SearchUsersPage }
