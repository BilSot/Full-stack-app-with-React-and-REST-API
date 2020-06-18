This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Full Stack App with React and a REST API

For this project, with the use of React for the front-end, a client is implemented for an existing school database REST API (part of the project REST-API-with-Express). The full stack application provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.

In addition, the project requires users to create an account and sign in to make changes to the database.

### Technologies used:
- JavaScript and JSX to build out the components for the application
- React Router to set up the routes
- Use the Fetch API to fetch data from the REST API
- Basic authentication to support users signing in


### How to run the application
## Install Node modules and get the database setup
- Open a Command Prompt (on Windows) or Terminal (on macOS and Linux) instance and browse to the `api` project folder.
- Run the command npm install to install the required dependencies.
- Run the command npm run seed to create the application's database and populate it with data.
- After the command completes, you'll find in the project's root folder a SQLite database file named fsjstd-restapi.db. To view the data inside the database, you can use DB Browser for SQLite.
- Run the command npm start to run the Node.js Express application.
- You can press Ctrl-C to stop the Node.js REST API.

## Install Node modules of the React application
- Open a Command Prompt (on Windows) or Terminal (on macOS and Linux) instance and browse to the `client` project folder.
- Run the command npm install to install the required dependencies.
- Run the command npm start to run the React application.
- You can press Ctrl-C to stop React.