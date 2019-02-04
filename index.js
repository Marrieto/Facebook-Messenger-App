const Koa = require("koa");
const json = require("koa-json");
const KoaRouter = require("koa-router");
const BodyParser = require('koa-bodyparser')
const request = require('request')

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
router.get("/", ctx => {
  let request_body = {
    "recipient": {
      "id": "MartinoLindahl"
    },
    "message": "Tjenamors!"
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  this.body = 'Your message has been sent'
});

// Verify route
// router.post('/webhook', ctx => {
//   message = ctx.body
  
// })

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started.");
});
