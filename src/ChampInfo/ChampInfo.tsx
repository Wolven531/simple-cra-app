import { Container, makeStyles, Theme } from '@material-ui/core'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import { theme } from '../theme'
import { IChampInfo } from '../types/IChampInfo'

interface props {
	champId: string
}

const useStyles = makeStyles({
	champInfoContainer: (theme: Theme) => ({
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		justifyContent: 'center',
		color: 'white',
	}),
})

export const ChampInfo: FC = () => {
	const classes = useStyles(theme)
	let props = useParams<props>()
	const { api, setTitle } = useContext(GlobalContext) // for page title and API access
	const [champ, setChamp] = useState<IChampInfo>()

	const fireGetChampInfo = useCallback(async () => {
		setChamp(await api.getChampInfo(props.champId))
	}, [api])

	useEffect(() => {
		setTitle(props.champId)
		fireGetChampInfo()
		console.log(champ)
	}, [setTitle, fireGetChampInfo])

	return (
		// champ && (
		// 	<Container className={classes.champInfoContainer}>
		// 		{/* {champ.lore} */}fuck
		// 	</Container>
		// )
		<Container>butt</Container>
	)
}
