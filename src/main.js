const Pino = require('pino-http');

const app = require('./app');

const pinoLogger = Pino();

app.use(pinoLogger);

const port = 3000;

process.on('uncaughtException', (err) => {
  // Log the exception and exit
  req.log.error(err)
  console.log('uncaughtException', err.message);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
