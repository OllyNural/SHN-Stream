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

### Endpoints

/video - Begins streaming a 'video'. This endpoint will increment the user's stream count

This requires a header:

```
x-user-id: <some_numerical_id>
```

e.g

```
x-user-id: 5
```

See Note in Decision Making. 

## Thoughts

### Decision making

Originally spent some time thinking HTTP vs Websockets/something else, as I couldn't really think how the HTTP Rest API would fit in with Video Streaming.

However then read a blog article about how streaming video on Node can work, and one option is to send a video on an endpoint with a long live connection and send small chunks at a time. So it's just a normal express endpoint.

One option was to have add, get, and update endpoints for a user passing in a stream ID or something similar and follow REST patterns. But I couldn't really figure out how this would fit in with a streaming system as a whole, and it felt a little clunky for a real-world streaming system.
(Note, this seems the MUCH MORE SENSIBLE WAY of doing it in hindsight)

### Caveats

Instead, I decided to try something that (after looking for 5 mins online) a little closer to the actual idea of a node streaming video service. When a user tries to hit the /video endpoint, we check the value, if it's good send the video and increment value, otherwise send back error. 

This means I've commented out the remove stream from a user on line 24 on routes. 
Ideally, that would play the video, and once the video stream has ended, the stream would then be removed from the user in the datastore. 

However, because there's no datastore currently, it would immediately remove the stream from the user after adding it. You can test this by uncommenting/commenting the line. 

### User Identification

Originally spent some time looking at IPs from express to track repeat requests from users
But in a real world app I'd assume there would be some authentication in front of this
Some API Gateway equivilant, and I've made the assumption of passing a user-id in the header

Not sure if this is the best approach, but it feels better than relying on IPs, even for an example app

### Data Storage

File System, pretty much it.

### Logging

I started with Morgan as the logger, which is great for middleware logging.

I should have used something like Winston, or at least a generic logger that let me log out anywhere in my node app, I thought Morgan could do this and didn't look into it enough and a little late!

This has middleware generic request logging, but no logging on the actual backend code. 


