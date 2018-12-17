# gcp-sample-app
Sample app for GCP deployment

## Configuration

The app is configured via environment variables

| Environment variable | Description                | Default |
|----------------------|----------------------------|---------|
| `PORT`               | Port the server listens on |  8000   |

## Routes

The app has one very useful route and several standard Dockerflow routes

| Request              | Description                         |
|----------------------|-------------------------------------|
| GET /                | Returns string `Hello World!`       |
| GET /__heartbeart__  | Returns JSON `{"status":"ok"}`      |
| GET /__lbheartbeat__ | Returns JSON `{"status":"ok"}`      |
| GET /__version__     | Returns JSON body of `package.json` |
