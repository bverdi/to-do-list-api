# To-do List API 

Application built with Node.js and Serverless Framework. 

Tests using Mocha and Instanbul for coverage.

## Do not forget to rename the .env.dist to .env in order to run the project successfully.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run the API locally
```
npm run local
```

### Running tests locally
node_env=local mocha -t 10000

### Test with coverage locally
```
node_env=local nyc --reporter=html mocha -t 10000
```
### Lints and fixes files
```
npm run lint
```
