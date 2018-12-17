const express = require('express');
const helmet = require('helmet');
const mozlog = require('mozlog')({
  app: 'gcp-sample-app'
});
const morgan = require('morgan');

const app = express();
const logger = mozlog('server');
const port = process.env.PORT || 8000;

app.use(morgan((tokens, req, res) => {
  return JSON.stringify({
    Timestamp: Date.now() * 1000 * 1000,
    Logger: 'gcp-sample-app',
    Type: 'http.request',
    Severity: 6,
    Pid: process.pid,
    EnvVersion: "2.0",
    Fields: {
      remoteAddr: tokens['remote-addr'](req, res),
      remoteUser: tokens['remote-user'](req, res),
      date: tokens.date(req, res, 'iso'),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      httpVersion: tokens['http-version'](req, res),
      status: tokens.status(req, res),
      contentLength: tokens.res(req, res, 'content-length'),
      referrer: tokens.referrer(req, res),
      userAgent: tokens['user-agent'](req, res),
      responseTime: tokens['response-time'](req, res),
      xForwardedFor: tokens.req(req, res, 'x-forwarded-for'),
      xForwardedProto: tokens.req(req, res, 'x-forwarded-proto'),
      trace: tokens.req(req, res, 'x-cloud-trace-context')
    }
  });
}));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/__heartbeat__', (req, res) => {
  res.send({"status": "ok"});
});

app.get('/__lbheartbeat__', (req, res) => {
  res.send({"status": "ok"});
});

const package = require('./package');
app.get('/__version__', (req, res) => {
  res.send(package);
});

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  logger.info('listening', { port: port });
});
