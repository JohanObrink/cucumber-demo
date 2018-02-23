# cucumber-demo

## Run locally

#### Install dependencies

Run `npm install` in `/web_app` and `/e2e`

#### Start postgres

```bash
docker-compose up
```

#### Start the app and then the tests

Run `npm run dev` in `/web_app` and then in `/e2e`

## Run in Docker

```bash
docker-compose -f docker-compose.test.yml build
docker-compose -f docker-compose.test.yml up
```
