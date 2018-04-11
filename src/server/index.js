const Koa = require('koa');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Hello World!'
  };
});

const server = app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = server;
