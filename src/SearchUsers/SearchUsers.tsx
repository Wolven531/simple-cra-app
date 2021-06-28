import { Typography } from '@material-ui/core'
import {
	Box,
	Button,
	Container,
	Grid,
	TextareaAutosize,
	TextField,
} from '@material-ui/core'
import axios from 'axios'
import React, { FC, useState } from 'react'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { ApiService } from '../services/ApiService'
import './SearchUsers.css'

interface SearchUsersProps {
	api: ApiService
	defaultSearchValue?: string
}

const SearchUsers: FC<SearchUsersProps> = ({
	api,
	defaultSearchValue = '',
}) => {
	const [newSearchValue, setNewSearchValue] = useState(defaultSearchValue)
	const [resultName, setSearchUserNameValue] = useState('')
	const [resultLevel, setSearchUserLevelValue] = useState('')
	const [resultIcon, setSearchUserIconValue] = useState('')

	const fireUserSearch = async () => {
		const response = await api.pingUserSearchEndpoint(newSearchValue)
		setSearchUserNameValue(response.name)
		setSearchUserLevelValue(response.summonerLevel)
		setSearchUserIconValue(response.profileIconId)
	}

	return (
		<Container className="config-page">
			<Typography variant='h2' align='center'>
				Note, search function is limited to single exact name result for now.
			</Typography>
			<Grid
				container
				alignItems="center"
				justify="center"
				className="api-container"
			>
				<Grid item>
					<input
						value={newSearchValue}
						onChange={(e) => {
							setNewSearchValue(e.target.value)
						}}
						placeholder="Username"
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								fireUserSearch()
							}
						}}
					/>
				</Grid>
				<Grid item>
					<Button color="primary" variant="contained" onClick={fireUserSearch}>
						Search
					</Button>
				</Grid>
			</Grid>
			{/* Display searched user data. Icon(ID will change to image whe API updated)/Name/Level */}
			<Container id='userDataContainer'>
				<Box className="display-data" display="inline" border={1}>
					{resultIcon}
				</Box>
				<Box className="display-data" display="inline" border={1}>
					{resultName}
				</Box>
				<Box className="display-data" display="inline" border={1}>
					{resultLevel}
				</Box>
			</Container>
		</Container>
	)
}

export { SearchUsers }
