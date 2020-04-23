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

## Thoughts

### Decision making

Originally spent some time thinking HTTP vs Websockets/something else, as I couldn't really think how the HTTP Rest API would fit in with Video Streaming.

However then read a blog article about how streaming video on Node can work, and one option is to send a video on an endpoint with a long live connection and send small chunks at a time. So it's just a normal express endpoint

### User Identification

Originally spent some time looking at IPs from express to track users
But in a real world app I'd assume there would be some authentication in front of this
Some API Gateway equivilant, and I've made the assumption of passing a user-id in the header

Could go down the route of not using IDs, e.g IP-Based restrictions, but that feels grim

Not sure if this is the best approach, but it feels better than relying on IPs, even for an example app