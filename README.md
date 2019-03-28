# final-project

The Final Project is a full-stack file backup and management utility.  It allows users to save their files to 'cloud' storage and manage them via a web application interface in the browser.

## The Server
- Exposes a [RESTful API](./api_docs.md) via the [ASP.NET Core Web API](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-2.1).
- Manages a file database with a simple Entity-Relationship model on top of [PostgreSQL](https://www.postgresql.org/).
### Entity-Relationship Diagram
![Entity-Relationship Diagram](./ERD.PNG?raw=true "ERD")

## The Client
- Offers a responsive and clean user experience built on [React](https://reactjs.org/) and the [Ant Design Component Library](https://ant.design/docs/react/introduce).
- Manages application state with [Redux](https://redux.js.org/).
- Performs asynchronous communication with the server in an elegant way via [Redux Thunk](https://github.com/reduxjs/redux-thunk).
