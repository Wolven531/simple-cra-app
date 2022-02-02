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
import { IUser } from '../types'
import StatsDisplay from '../StatsDisplay/StatsDisplay'
import { theme } from '../theme'

const useStyles = makeStyles({
	displayContainer: () => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	}),
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
	const [users, setUsers] = useState<IUser[]>([])
	// Users we are comparing
	const [userA, setUserA] = useState<IUser>()
	const [userB, setUserB] = useState<IUser>()
	// Const with setter for how many games stats to request from API
	const [numberOfGames, setNumberOfGames] = useState({
		count: 1,
	})
	// Const of A stats
	const [userAStats, setUserAStats] = useState<any>()
	// Const of B stats
	const [userBStats, setUserBStats] = useState<any>()
	// API call to get list of users
	const fireGetUsers = useCallback(async () => {
		const userList = await api.pingGetUsersEndpoint()
		setUsers(userList)
		setUserA(userList[0])
		setUserB(userList[0])
	}, [api])
	// API call to get stats for a user
	const fireGetStats = async (puuid: string): Promise<any> => {
		const statsResult = await api.pingSummonerStatsEndpoint(
			puuid,
			numberOfGames.count
		)
		const result = {
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
		}
		if (puuid === userA?.puuid) {
			setUserAStats(result)
		} else if (puuid === userB?.puuid) {
			setUserBStats(result)
		}
	}
	// Call fireGetStats for users A and B
	const compareUsers = async () => {
		await fireGetStats(userA?.puuid || '')
		await fireGetStats(userB?.puuid || '')
	}
	// Set page name, onload call fireGetUsers
	useEffect(() => {
		setTitle(`Comparison`)
		fireGetUsers()
	}, [fireGetUsers, setTitle])

	const gamesHandleChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setNumberOfGames({
			count: event.target.value as number,
		})
	}

	const userAHandleChange = async (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const u = users.find((user) => {
			return user.puuid === event.target.value
		})

		if (u) {
			setUserA(u)
		}
	}

	const userBHandleChange = async (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const u = users.find((user) => {
			return user.puuid === event.target.value
		})

		if (u) {
			setUserB(u)
		}
	}

	return (
		// Search Section: Layout; 2 Selects for user lists, 1 Select for # of games
		<Container maxWidth="md">
			{/* Search Section */}
			<Container maxWidth="sm" className={classes.searchContainer}>
				<Typography>Games:</Typography>
				<Select
					onChange={gamesHandleChange}
					value={numberOfGames.count}
				>
					{[
						1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
						17, 18, 19,
					].map((num) => (
						<MenuItem key={num} value={num}>
							{num}
						</MenuItem>
					))}
				</Select>
				{users.length <= 0 && (
					<Typography align="center" color="primary" variant="h6">
						No users
					</Typography>
				)}
				{users.length > 0 && userA && userB && (
					<>
						<Select
							onChange={userAHandleChange}
							value={userA.puuid}
						>
							{users.map(({ name, puuid }) => (
								<MenuItem key={puuid} value={puuid}>
									{name}
								</MenuItem>
							))}
						</Select>
						<Select
							onChange={userBHandleChange}
							value={userB.puuid}
						>
							{users.map(({ name, puuid }) => (
								<MenuItem key={puuid} value={puuid}>
									{name}
								</MenuItem>
							))}
						</Select>
					</>
				)}
				<Button onClick={compareUsers}>Search</Button>
			</Container>
			{/* Comparison display section */}
			<Container className={classes.displayContainer}>
				{userAStats && <StatsDisplay userStats={userAStats} />}
				{userBStats && <StatsDisplay userStats={userBStats} />}
			</Container>
		</Container>
	)
}

export { ComparePage }
