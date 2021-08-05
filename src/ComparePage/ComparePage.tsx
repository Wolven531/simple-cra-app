import {
	Button,
	Container,
	makeStyles,
	MenuItem,
	Select,
	Typography,
} from '@material-ui/core'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import { GetUsersEndpointResult } from '../services/ApiService'
import { theme } from '../theme'

const useStyles = makeStyles({
	searchContainer: () => ({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	}),
})

const ComparePage: FC = () => {
	const { api, setTitle } = useContext(GlobalContext) // for page title and API access

	const classes = useStyles(theme)
	// List of users on server
	const [users, setUsers] = useState<GetUsersEndpointResult[]>([])
	// Users we are comparing
	const [userA, setUserA] = useState({
		id: '0',
		masteryTotal: '0',
		name: '0',
		summonerLevel: 0,
	})
	const [userB, setUserB] = useState({
		id: '0',
		masteryTotal: '0',
		name: '0',
		summonerLevel: 0,
	})
	// Const with setter for how many games stats to request from API
	const [numberOfGames, setNumberOfGames] = useState({
		count: 1,
	})
	// Const of stats
	const [result, setResult] = useState({
		assistsAvg: 0,
		assistsTotal: 0,
		deathsAvg: 0,
		deathsTotal: 0,
		gamesCount: 0,
		goldEarnedAvg: 0,
		goldEarnedTotal: 0,
		kDA: 0,
		killsAvg: 0,
		killsTotal: 0,
		timePlayedAvg: 0,
		timePlayedTotal: 0,
		totalLosses: 0,
		totalWins: 0,
		winPercentage: 0,
	})
	// API call to get list of users
	const fireGetUsers = useCallback(async () => {
		const userList = await api.pingGetUsersEndpoint()

		setUsers(userList)
	}, [api])
	// API call to get stats for a user
	const fireGetStats = async (accountId: string): Promise<any> => {
		const statsResult = await api.pingSummonerStatsEndpoint(
			accountId,
			numberOfGames.count
		)
		setResult({
			assistsAvg: statsResult.assistsAvg,
			assistsTotal: statsResult.assistsTotal,
			deathsAvg: statsResult.deathsAvg,
			deathsTotal: statsResult.deathsTotal,
			gamesCount: statsResult.gamesCount,
			goldEarnedAvg: statsResult.goldEarnedAvg,
			goldEarnedTotal: statsResult.goldEarnedTotal,
			kDA: statsResult.kDA,
			killsAvg: statsResult.killsAvg,
			killsTotal: statsResult.killsTotal,
			timePlayedAvg: statsResult.timePlayedAvg,
			timePlayedTotal: statsResult.timePlayedTotal,
			totalLosses: statsResult.totalLosses,
			totalWins: statsResult.totalWins,
			winPercentage: statsResult.winPercentage,
		})
	}
	// Call fireGetStats for users A and B
	const compareUsers = () => {}
	// Set page name, onload call fireGetUsers
	useEffect(() => {
		setTitle(`Comparison`)
		fireGetUsers()
	}, [])

	const gamesHandleChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setNumberOfGames({
			count: event.target.value as number,
		})
	}

	const userAHandleChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setNumberOfGames({
			count: event.target.value as number,
		})
	}

	const userBHandleChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setNumberOfGames({
			count: event.target.value as number,
		})
	}

	return (
		// Search Section: Layout; 2 Selects for user lists, 1 Select for # of games
		<Container className={classes.searchContainer}>
			{/* Search Section */}
			<Container>
				<Typography>Games:</Typography>
				<Select
					onChange={gamesHandleChange}
					value={numberOfGames.count}
				>
					{[
						1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
						17, 18, 19,
					].map((num) => (
						<MenuItem value={num}>{num}</MenuItem>
					))}
				</Select>
				{users.length <= 0 && (
					<Typography align="center" color="primary" variant="h6">
						No users
					</Typography>
				)}
				{users.length > 0 && (
					<>
						<Select
							onChange={userAHandleChange}
							value={users[0].summonerId}
						>
							{users.map(({ name, summonerId }) => (
								<MenuItem value={summonerId}>{name}</MenuItem>
							))}
						</Select>
						<Select
							onChange={userBHandleChange}
							value={users[0].summonerId}
						>
							{users.map(({ name, summonerId }) => (
								<MenuItem value={summonerId}>{name}</MenuItem>
							))}
						</Select>
					</>
				)}
			</Container>
			<Button onClick={compareUsers}>Search</Button>
		</Container>
	)
}

export { ComparePage }
