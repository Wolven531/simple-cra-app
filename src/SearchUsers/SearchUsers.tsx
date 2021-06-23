import { Button, Container, Grid, TextareaAutosize } from '@material-ui/core'
import axios from 'axios'
import React, { FC, useState } from 'react'
import { ConfigPage } from '../ConfigPage/ConfigPage'
import { ApiService } from '../services/ApiService'

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

	const fireUserSearch = async () => {
		const response = await api.pingUserSearchEndpoint(newSearchValue)
		setSearchUserNameValue(response.name)
		setSearchUserLevelValue(response.summonerLevel)
	}

	return (
		<Container className="config-page">
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
			<TextareaAutosize rowsMin={2} placeholder={`Username:${searchUserName}\nPlayer Level:${searchUserLevel}`}/>
		</Container>
	)
}

export { SearchUsers }
