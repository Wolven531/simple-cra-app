class ApiService {
	private apiUrl: string

	/**
	 * This service enables communication w/ the API in a centralized location
	 *
	 * @param apiUrl Base URL of the API for this service to use
	 */
	constructor(apiUrl: string | undefined = '') {
		this.apiUrl = apiUrl
	}

	pingApiHealthEndpoint() {
		fetch(
			`${this.apiUrl}/health`,
			{
				cache: 'no-cache',
				method: 'get',
			})
			.then(resp => resp.text())
			.then(text => { alert(text) })
			.catch(this.handleError)
	}

	pingTokenCheckEndpoint() {
		fetch(
			`${this.apiUrl}/config/check-token`,
			{
				cache: 'no-cache',
				method: 'get',
			})
			.then(resp => resp.text())
			.then(text => { alert(!!text ? 'Valid' : 'NOT VALID') })
			.catch(this.handleError)
	}

	setApiUrl(newApiUrl: string) {
		this.apiUrl = newApiUrl
	}

	private handleError(err: Error) {
		console.error(err)
		alert(`There was a problem -\n\n${err.message}`)
	}
}

export { ApiService }
