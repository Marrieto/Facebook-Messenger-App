const Koa = require("koa");
const json = require("koa-json");
const KoaRouter = require("koa-router");
const BodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new KoaRouter();

// Formats json to web browser
app.use(json());

// Body parser
app.use(BodyParser())

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

// test route
router.get("/test", ctx => (ctx.body = "Hello test"));

app.listen(process.env.port, () => {
  console.log("Server started.");
});
