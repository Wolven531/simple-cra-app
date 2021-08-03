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
import React, { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import { theme } from '../theme'

const useStyles = makeStyles({
	searchContainer: () => ({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	}),
})

const UserStatsPage: FC = () => {
	const { id: accountId, games } = useParams<{ id: string; games: string }>() // Grab account id from url
	const { api, setTitle } = useContext(GlobalContext) // Access global api for setting page title
	const classes = useStyles(theme) // Gets theme for the site

	// Const with setter for how many games stats to request from API
	const [numberOfGames, setNumberOfGames] = useState({
		count: parseInt(games),
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

	// Ping API for requested number of games and set stats
	const fireGetStats = async (): Promise<any> => {
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

	useEffect(() => {
		// I would like to dynamically change title ex"Zorven's last 10 games stats"
		// Thoughts: ping API(/user/get/{summonerId}) using id
		setTitle(`User Stats`) // Set page title
		fireGetStats() // Fires default search on page load
	}, [])

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setNumberOfGames({
			count: event.target.value as number,
		})
	}

	return (
		// Search section: input MUI Select (1-19) and MUI Button for selecting how many games to search
		// Display section: data displayed in MUI Table. Layout Stat: Score
		<Container>
			{/* Search Section */}
			<Container className={classes.searchContainer}>
				<Container>
					<Typography>Games:</Typography>
					<Select onChange={handleChange} value={numberOfGames.count}>
						{[
							1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
							16, 17, 18, 19,
						].map((num) => (
							<MenuItem value={num}>{num}</MenuItem>
						))}
					</Select>
				</Container>
				<Button onClick={fireGetStats}>Search</Button>
			</Container>
			{/* Display Section */}
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
						{Object.entries(result).map(([key, value]) => (
							<TableRow key={key}>
								<TableCell component="th" scope="row">
									{key}
								</TableCell>
								<TableCell align="right">
									{value.toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Container>
		</Container>
	)
}

export { UserStatsPage }
