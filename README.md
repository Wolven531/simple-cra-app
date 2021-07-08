# Next Gen League Compare

This repository contains a React app (using Typescript) that consumes Riot API data related to League of Legends. The repository containing the API this app consumes is located [here](https://github.com/Wolven531/simple-nest-app)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode; Open [http://localhost:4000](http://localhost:4000) to view it in the browser

### `npm test`

Runs tests and outputs code coverage

## Notes

Locally, the app runs on port 4000 (as specified in the `.env` file)

By default, the app looks to `localhost:3000` for a running API; to override this URL, set `REACT_APP_API_URL` in your environment variables or update `REACT_APP_API_URL` in `.env`

API Environments (other than localhost)

* Staging API - [https://simple-nest-staging.herokuapp.com](https://simple-nest-staging.herokuapp.com)
* Production API - [https://simple-nest-prod.herokuapp.com](https://simple-nest-prod.herokuapp.com)

## Misc.

* Heroku CRA buildpack used - `mars/create-react-app` (full URL - `https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz`)
* Also can run on `heroku/nodejs` buildpack
