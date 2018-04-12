const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const showRoutes = require('./routes/shows');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(showRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = server;
