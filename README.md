## SHN-Stream Backend Streaming Application


## Setup 

Requires Node, Npm, Docker

Run `npm install`

## Tests

### Unit Tests

Unit Tests are written with Jest

They can be found in each individual source code folder

Run using:

```
npm run test:unit
```

### Integration Tests

Integration Tests are written with Jest and Supertest

They can be found in the /tests/integration/ folder

Run using:

```
npm run test:integration
```

## Running

### Local

Run local dev:

```
npm run start:dev
```

The server will startup on http://localhost:8000

### Docker

Build Docker image:

```
docker build -t node-app .
```

Run Docker image:

```
docker run -p 8000:8000 node-app
```