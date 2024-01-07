
import Logger from './infrastructure/core/Logger';
import routes from './presentation/routes';
import Fastify from 'fastify';
import cors from '@fastify/cors'

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = Fastify({
  logger: true,
});

app.register(cors, {
  credentials: true,
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
})

// Routes
routes.forEach((route) => {
  app.route(route);
});

app.get('/healthcheck', (req, res) => {
  res.send({ status: "THIS WORKS" });
});


export default app;
