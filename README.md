# Node JS Github Issues Sync Data Project

## Overview
The Node JS Github Issues Sync Data Project is designed to synchronize data from GitHub issues onto a MongoDB database using the GitHub API, Express, Mongoose, and Clerk. This project is divided into two parts: one without authentication and the other with authentication using Passport JS.

## Before Starting
Before starting the project, ensure the following steps are completed:

1. Create a GitHub repository and add at least 10 issues to the project.
2. Generate a GitHub API token.

## Part 1 - Without Authentication

### Sync API
- **Endpoint:** `POST /sync`
- **Description:** Fetches all issues from a specified GitHub repo and saves them in MongoDB. For new issues, it creates a new document, and for existing issues, it updates the existing document.
- **Validation:** Utilizes Mongoose to validate the schema from GitHub.
- **Batching:** Batches API requests to GitHub Issues; if there are more than 3 issues, fetches 3 issues concurrently, waits for 1 second, and then fetches the next 3 issues.

### Get Issue Detail API
- **Endpoint:** `GET /issues/:issue_id`
- **Description:** Fetches details of the corresponding GitHub issue based on the provided issue ID.

### Update Issue Detail API
- **Endpoint:** `PUT /issues/:issue_id`
- **Description:** Saves the modified issue details in the database and updates the corresponding issue in GitHub.

## Part 2 - With Authentication

### Authentication
- **Integration:** Uses Passport JS for authentication.
- **Endpoint Protection:** Secures the APIs with authentication to ensure authorized access.

## Usage

1. Clone the repository: `git clone https://github.com/anilmaurya61/github-issues-project.git`
2. Install dependencies: `npm install`
3. Set up environment variables, including the GitHub API token.
4. Run the application: `npm start`
5. Access the APIs as described in the documentation.

