# Home Library Service

## Description

Here `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!
- [task requirements](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/database-orm/assignment.md)
- [task score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/database-orm/score.md)

## Installation guide

```
git clone https://github.com/LehaGer/nodejs2022Q4-service.git
```

```
git checkout develop-postgresql
```
local machine mode (configuring .env POSTGRES_DB_NETWORK_NAME variable to localhost need):
```
npm install
```
container mode:
```
npm run docker:build
```

## Running application

local machine mode:
```
npm start
```
container mode:
```
npm run docker:up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization locally:

```
npm run test
```
inside container runned before
```
docker exec rest-api npm run test 
```


To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Migrations

###### Default migration's directory is DB/migrations/

On the start of application, you should create initial migration:
```
npm run migration:create DB/migrations/init
```
After creating initial migration or changing TypeORM-scheme, to apply changes to PostgreSQL DB, you should run command:
```
npm run migration:generate DB/migrations/gen1
```
After that your generated migration file will be applied automatically. Or you can execute it manually, by running:
```
npm run migration:run
```

###### if you try to interact with migrations from container side, for successful connection to DB during migrations build, you should update defaultProps.POSTGRES_DB_NETWORK_NAME value from [data-source.ts](src%2Fdatabase%2Fstores%2Ftypeorm.storage%2Fdata-source.ts) file to 'db'

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

