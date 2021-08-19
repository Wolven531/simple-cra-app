import {
	Box,
	Button,
	Container,
	makeStyles,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../GlobalContext'
import { GetUsersEndpointResult } from '../services/ApiService'
import { theme } from '../theme'

const useStyles = makeStyles({
	displayContainer: () => ({}),
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
	const [userA, setUserA] = useState<GetUsersEndpointResult>({
		accountId: '0',
		lastUpdated: 0,
		masteryTotal: 0,
		name: '0',
		summonerId: '0',
	})
	const [userB, setUserB] = useState({
		accountId: '0',
		lastUpdated: 0,
		masteryTotal: 0,
		name: '0',
		summonerId: '0',
	})
	// Const with setter for how many games stats to request from API
	const [numberOfGames, setNumberOfGames] = useState({
		count: 1,
	})
	// Const of stats
	const [userAStats, setUserAStats] = useState({
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
		console.log('userlist ' + userList)
		setUsers(userList)
	}, [api])
	// API call to get stats for a user
	const fireGetStats = async (accountId: string): Promise<any> => {
		const statsResult = await api.pingSummonerStatsEndpoint(
			// Currently sending summonerId not accountId, need to fix
			accountId,
			numberOfGames.count
		)
		setUserAStats({
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
	const compareUsers = async () => {
		fireGetStats(userA.accountId)
	}
	// Set page name, onload call fireGetUsers
	useEffect(() => {
		setTitle(`Comparison`)
		fireGetUsers()
		console.log('here   ' + users[0])
		// EUREKA! This set is being called before set users happens
		setUserA(users[0])
		setUserB(users[0])
	}, [])

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
		const userAResponse = await api.pingUserSearchEndpoint(
			event.target.value as string
		)
		// setUserA({

		// })
	}

	const userBHandleChange = async (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const userBResponse = await api.pingUserSearchEndpoint(
			event.target.value as string
		)
		// setUserA({

		// })
	}

	return (
		// Search Section: Layout; 2 Selects for user lists, 1 Select for # of games
		<Container className={classes.displayContainer}>
			{/* Search Section */}
			<Container className={classes.searchContainer}>
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
							value={userA.summonerId}
						>
							{users.map(({ name, summonerId }) => (
								<MenuItem value={summonerId}>{name}</MenuItem>
							))}
						</Select>
						<Select
							onChange={userBHandleChange}
							value={userB.summonerId}
						>
							{users.map(({ name, summonerId }) => (
								<MenuItem value={summonerId}>{name}</MenuItem>
							))}
						</Select>
					</>
				)}
				<Button onClick={compareUsers}>Search</Button>
			</Container>
			{/* Comparison display section */}
			<Container>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<Box fontWeight="bold">
									<u>Stat</u>
								</Box>
							</TableCell>
							<TableCell align="right">
								<Box fontWeight="bold">
									<u>Score</u>
								</Box>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Average Kills</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>{userAStats.killsAvg}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Total Kills</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>{userAStats.killsTotal}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Average Deaths</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>{userAStats.deathsAvg}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Total Deaths</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.deathsTotal}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Average Assists</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>{userAStats.assistsAvg}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Total Assists</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.assistsTotal}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>KDA</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.kDA.toFixed(3)}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Gold Earned Average</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.goldEarnedAvg.toFixed(0)}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Gold Earned Total</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.goldEarnedTotal}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Average Time Played</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.timePlayedAvg}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Total Time Played</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.timePlayedTotal}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Game Count</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>{userAStats.gamesCount}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Wins</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>{userAStats.totalWins}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Losses</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.totalLosses}
								</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell component="th" scope="row">
								<Typography>Win Percentage</Typography>
							</TableCell>
							<TableCell align="right">
								<Typography>
									{userAStats.winPercentage}%
								</Typography>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Container>
		</Container>
	)
}

export { ComparePage }
