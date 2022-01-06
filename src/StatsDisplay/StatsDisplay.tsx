import {
	Container,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Box,
	TableBody,
	Typography,
} from '@material-ui/core'
import React, { FC } from 'react'

interface UserStats {
	assistsAvg: number
	assistsTotal: number
	deathsAvg: number
	deathsTotal: number
	gamesCount: number
	goldEarnedAvg: number
	goldEarnedTotal: number
	kDA: number
	killsAvg: number
	killsTotal: number
	timePlayedAvg: number
	timePlayedTotal: number
	totalLosses: number
	totalWins: number
	winPercentage: number
}

interface UserStatsProps {
	userStats: UserStats
}
const StatsDisplay: FC<UserStatsProps> = (props) => {
	const { userStats } = props

	return (
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
							<Typography>{userStats.killsAvg}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Total Kills</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.killsTotal}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Average Deaths</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.deathsAvg}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Total Deaths</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.deathsTotal}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Average Assists</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.assistsAvg}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Total Assists</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.assistsTotal}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>KDA</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.kDA.toFixed(3)}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Gold Earned Average</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>
								{userStats.goldEarnedAvg.toFixed(0)}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Gold Earned Total</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.goldEarnedTotal}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Average Time Played</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.timePlayedAvg}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Total Time Played</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.timePlayedTotal}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Game Count</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.gamesCount}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Wins</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.totalWins}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Losses</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.totalLosses}</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell component="th" scope="row">
							<Typography>Win Percentage</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>{userStats.winPercentage}%</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Container>
	)
}

export default StatsDisplay
