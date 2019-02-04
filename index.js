const Koa = require("koa");
const json = require("koa-json");
const KoaRouter = require("koa-router");
const BodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new KoaRouter();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

const message = ''

// Formats json to web browser
app.use(json());

// Body parser
app.use(BodyParser())

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

// test route
router.get("/", ctx => (ctx.body = message));

// Verify route
router.post('/webhook', ctx => {
  message = ctx.body
  
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started.");
});
