const Router = require('koa-router');
const queries = require('../db/queries/shows');

const router = new Router();
const BASE_URL = '/api/v1/shows';

router.get(BASE_URL, async ctx => {
  try {
    const shows = await queries.getAllShows();
    ctx.body = {
      status: 'success',
      data: shows
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`${BASE_URL}/:id`, async ctx => {
  try {
    const show = await queries.getSingleShow(ctx.params.id);
    if (show.length) {
      ctx.body = {
        status: 'success',
        data: show
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'Show does not exist.'
      };
    }
  } catch (err) {
    console.log(err);
  }
});

router.post(`${BASE_URL}`, async ctx => {
  try {
    const show = await queries.addShow(ctx.request.body);
    if (show.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: show
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.put(`${BASE_URL}/:id`, async ctx => {
  try {
    const show = await queries.updateShow(ctx.params.id, ctx.request.body);
    if (show.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: show
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That show does not exist'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.delete(`${BASE_URL}/:id`, async ctx => {
  try {
    const show = await queries.deleteShow(ctx.params.id);
    if (show.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: show
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That show does not exist'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred'
    };
  }
});

module.exports = router;
