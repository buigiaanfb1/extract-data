# Extractor - tool helps you to crawl data of the request based on Google Search

### This project is available in production now
### `https://extract-data-challenge.herokuapp.com`
[Click here to direct to the Extractor](https://extract-data-challenge.herokuapp.com)

# Getting Started with the Extractor
### **What's included in this app?**
- Sign up
- Sign in
- Search keyword in database of that user
- Upload keyword
- Crawl keyword in Google Search
- Save info's keyword to database
- List all keywords of user


### **Sample of .csv file for upload keyword:**
**Sample format of .csv file:**

Download here: [Sample .csv format file | Google Drive](https://drive.google.com/file/d/1060n614FJIefQXYYQ-UE2XyY6Hc844U_/view?usp=sharing)
```html
| Keywords | 
| -------- |
| Sports   | 
| News     | 
| Gym      | 
| Crypto   | 
```

**Tech stack that I used for this project:**

```html
_______________________________________
| Frontend      | Backend    | Deploy |
| ------------- | -----------| -------|
| React.js      | Node.js.   | Heroku |
| Redux Toolkit | Express.js |        |
| Bootstrap     | Jwt        |        |
| SCSS          | PostgreSQL |        |
|               | Sequelize  |        |
_______________________________________
```

**APIs:**

 **`Headers:`**
 - authorization: **string**

 **`Params:`**
 - keyword: **string**

 **`Body:`**
 - keyword: **Array[string]**
 - signup: **{ email: string, username: string, password: string }**
 - signin: **{ username: string, password: string }**

```html
_____________________________________________________________________
| URI                   | Method  | Headers       | Params  | Body
| --------------------- | ------- | ------------- | ------  | -------
| /api/auth             | GET     | authorization |         | 
| /api/auth/signup      | POST    |               |         | signup
| /api/auth/signin      | POST    |               |         | signin
|                       |         |               |         |
| /api/keywords/crawl   | POST    | authorization |         | keyword
| /api/keywords         | GET     | authorization |         |
| /api/keywords/search  | GET     | authorization | keyword |
_______________________________________
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app and the server in the development mode.

**For the frontend:** [http://localhost:3000](http://localhost:3000) to view it in the browser.\
**For the server:** it will run on PORT [http://localhost:8080](http://localhost:8080)

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build --prefix client`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
