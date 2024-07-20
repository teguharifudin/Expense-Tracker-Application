![](https://www.teguharief.com/img/teguh-arief.png)

# Expense Tracker Application

This application starts with the user registering, successfully logging in, then creating categories and inputing their expenses.
- The Expense feature has a category ID to populate as a category name. Each expense and other expense can have the same category.
- The Category is unique, as each user can automatically change its values ​​when editing.
- All categories will be displayed to users, including categories created by other users, but you unable to delete or edit categories that you did not create.

Users can track expenses by category, date, month and year. And displays an expense graph with color lengths according to its values. And as a bonus, users can print the PDF.

## Installation

Install the app on terminal

```
git clone git@github.com:teguharifudin/Expense-Tracker-Application.git
```
```
cd Expense-Tracker-Application
```

### Backend
```
cd backend
```
```
npm install
```
```
npm start
```

### Frontend
```
cd frontend
```
```
npm install
```
```
npm start
```

## Usage

- To provide a set of predefined categories, run the Backend before on browser at http://localhost:3001/
- Then run the Frontend on browser at http://localhost:3000/


## API

### Signup
POST /auth/signup

### Login
POST /auth/login

### Profile
GET Bearer Authentication /profile

### Category
GET Bearer Authentication /category

POST Bearer Authentication /category

PUT Bearer Authentication /category/:id

DELETE Bearer Authentication /category/:id

GET Bearer Authentication /category/:type

### Expense
POST Bearer Authentication /expense

POST Bearer Authentication /expense/create

PUT Bearer Authentication /expense/:id

DELETE Bearer Authentication /expense/:id

## Contributing

Please use the [issue tracker](https://github.com/teguharifudin/Expense-Tracker-Application/issues) to report any bugs or file feature requests.
