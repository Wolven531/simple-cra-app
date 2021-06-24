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
	const [searchUserName, setSearchUserNameValue] = useState('')
	const [searchUserLevel, setSearchUserLevelValue] = useState('')
	const [searchUserIcon, setSearchUserIconValue] = useState('')

	const fireUserSearch = async () => {
		const response = await api.pingUserSearchEndpoint(newSearchValue)
		setSearchUserNameValue(response.name)
		setSearchUserLevelValue(response.summonerLevel)
		setSearchUserIconValue(response.profileIconId)
	}

	return (
		<Container className="config-page">
			<h2 className="note">
				Note, search function is limited to single exact name result for now.
			</h2>
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
				<Box className="displayData" component="div" display="inline" border={1}>
					{searchUserIcon}
				</Box>
				<Box className="displayData" component="div" display="inline" border={1}>
					{searchUserName}
				</Box>
				<Box className="displayData" component="div" display="inline" border={1}>
					{searchUserLevel}
				</Box>
			</Container>
		</Container>
	)
}

export { SearchUsers }
