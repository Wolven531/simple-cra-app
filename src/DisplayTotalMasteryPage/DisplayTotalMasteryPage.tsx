import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC, useContext, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import { theme } from '../theme'

interface DisplayTotalMasteryPageProps {}

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

const DisplayTotalMasteryPage: FC<DisplayTotalMasteryPageProps> = ({}) => {
	const { name } = useParams<{ name: string }>()
	const { api, setTitle } = useContext(GlobalContext) // for page title and API access
	const classes = useStyles(theme)

	const [result, setResult] = useState({
		icon: '',
		mastery: 0,
		name: '',
		summonerId: '',
	})

	const fireGetMastery = async (): Promise<void> => {
		const summonerResult = await api.pingUserSearchEndpoint(name)
		const masteryResult = await api.pingMasteryTotalEndpoint(
			summonerResult.id
		)
		setResult({
			icon: summonerResult.profileIconId,
			mastery: masteryResult,
			name: summonerResult.name,
			summonerId: summonerResult.id,
		})
	}

	useEffect(() => {
		setTitle(`${name}'s mastery`)
		fireGetMastery()
	}, [])

	return (
		// Display user icon, username, and total mastery
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
				<Typography align="right" color="secondary" variant="h6">
					{result.icon}
				</Typography>
			</Container>
			<Container className={classes.resultRow}>
				{/* Add link to DIsplayTotalMastery */}
				<Typography align="left" color="primary" variant="h6">
					Name:
				</Typography>
				<Typography align="right" color="secondary" variant="h6">
					{result.name}
				</Typography>
			</Container>
			<Container className={classes.resultRow}>
				<Typography align="left" color="primary" variant="h6">
					Total Mastery:
				</Typography>
				<Typography align="right" color="secondary" variant="h6">
					{result.mastery}
				</Typography>
			</Container>
		</Container>
	)
}

export { DisplayTotalMasteryPage }
