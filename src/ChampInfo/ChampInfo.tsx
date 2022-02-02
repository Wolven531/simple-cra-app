import { Container, makeStyles, Theme } from '@material-ui/core'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import { theme } from '../theme'
import { IChampInfo } from '../types/IChampInfo'

interface IChampRouteProps {
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

export const ChampInfo: FC<any> = () => {
	const classes = useStyles(theme)
	const props = useParams<IChampRouteProps>()
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

	if (!champ) {
		return <></>
	}

	return (
		<Container className={classes.champInfoContainer}>
			{champ.lore}
		</Container>
	)
}
