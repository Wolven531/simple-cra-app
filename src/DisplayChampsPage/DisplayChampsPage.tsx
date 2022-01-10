import { Container, makeStyles, Theme } from '@material-ui/core'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { ChampDisplay } from '../ChampDisplay/ChampDisplay'
import { GlobalContext } from '../GlobalContext'
import { theme } from '../theme'

const useStyles = makeStyles({
	errorContainer: (theme: Theme) => ({
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(3),
	}),
	champsContainer: (theme: Theme) => ({
		display: 'grid',
		gridAutoRows: '200px',
		gridTemplateColumns: '30% 30% 30% ',
		marginTop: theme.spacing(3),
	}),
})

// get version from https://ddragon.leagueoflegends.com/api/versions.json
// store first value as latest version
// Make Individual champ displays
// Make API method to get all champs based on version
// all champs json http://ddragon.leagueoflegends.com/cdn/12.1.1/data/en_US/champion.json
// add latest version to sprite sheet url ex http://ddragon.leagueoflegends.com/cdn/12.1.1/img/sprite/champion0.png
// Get champ data from http://ddragon.leagueoflegends.com/cdn/12.1.1/data/en_US/champion/Aatrox.json (sub in champ name)
// Get champ sprite sheet image position from champ data

export const DisplayChampsPage: FC = () => {
	const classes = useStyles(theme)
	const { api, setTitle } = useContext(GlobalContext) // for page title and API access
	const [champs, setChamps] = useState<any[]>([])

	const fireGetChamps = useCallback(async () => {
		setChamps(await api.getAllChamps())
	}, [api])

	useEffect(() => {
		setTitle('Champions')
		fireGetChamps()
	}, [setTitle, fireGetChamps])

	return (
		<Container className={classes.champsContainer}>
			{champs.map((champ) => (
				<ChampDisplay champInfo={champ} />
			))}
		</Container>
	)
}
