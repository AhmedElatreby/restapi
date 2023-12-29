Rest Api with NodeJS, Express and PostgreSQL
===


## Start
- Install Dependencies
  ```
  npm install
  ```
- Run App
  ```
  npm start
  ```

## Technology Stack
- Node js
- Express Js
- PostgreSQL

## Directory Hierarchy
```
|—— .env
|—— .gitignore
|—— db.js
|—— node_modules
|—— package-lock.json
|—— package.json
|—— server.js
|—— src
|    |—— student
|        |—— controller.js
|        |—— queries.js
|        |—— routes.js
```

### Database Connections - PostgreSQL
```js
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;
```
