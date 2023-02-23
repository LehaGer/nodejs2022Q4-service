# Home Library Service

## Description

Here `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!
- [task requirements](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization/assignment.md)
- [task score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization/score.md)

## Installation guide

```
git clone https://github.com/LehaGer/nodejs2022Q4-service.git
```

```
git checkout develop-postgresql
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

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

