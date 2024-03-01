# SpendSmart Backend

This repository contains the REST-API for the financial management app [SpendSmart](https://github.com/derrdavid/SpendSmart).

## Setup

1. **Clone the Repository:** Use `git clone` to clone the repository to your local machine.

2. **Install Dependencies:** Navigate to the directory of the cloned repository and run `npm install` to install the required dependencies.

3. **Start the Server:** Start the server using the command `npm start`.

## Packages

This project utilizes the following packages:

- Express.js
- Mongoose 
- dotenv
  
## API Documentation

The API provides the following endpoints:

### Expenses Endpoints

- `GET /expenses`: Retrieves all expenses.
- `POST /expenses`: Adds a new expense.
- `PUT /expenses/:id`: Updates an existing expense.
- `DELETE /expenses/:id`: Deletes an expense by its ID.
- `DELETE /expenses`: Deletes multiple expenses. Pass IDs in the HTTP body.
- `GET /expenses/:year`: Retrieves expenses for a specific year.
- `GET /expenses/:year/:month`: Retrieves expenses for a specific year and month.
- `POST /expenses/swap`: Performs swap. Pass IDs in the HTTP body.

### Budgets Endpoints:

- `GET /budgets`: Retrieves all budgets.
- `POST /budgets`: Adds a new budget.
- `PUT /budgets/:id`: Updates an existing budget.
- `DELETE /budgets/:id`: Deletes a budget by its ID.
- `GET /budgets/:year`: Retrieves budgets for a specific year.

### Categories Endpoints:

- `GET /categories`: Retrieves all categories.
- `GET /categories/:id`: Retrieves a specific category by its ID.
- `PUT /categories/:id`: Updates a specific category by its ID.
- `POST /categories`: Adds a new category.
- `DELETE /categories/:id`: Deletes a category by its ID.

## Contributing

- [David Derr](https://github.com/derrdavid)


## Privacy and Security

For privacy reasons, sensitive information such as database credentials are not included in this repository.

