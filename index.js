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
// app.use(router.routes()).use(router.allowedMethods());
app.use(router.routes());

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
  ctx.body = 'Your message has been sent'
});

router.get('/hook', ctx => {
  console.log(ctx.query['hub.challenge'])
  let responseNumber = ctx.query['hub.challenge']
  let responseToken = ctx.query['hub.verify_token']
  // let responseHeaders = [responseNumber, responseToken]

  ctx.body = responseNumber
})

// Handles messages events
function handleMessage(sender_psid, received_message) {

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  
}

// Verify route
// router.post('/webhook', ctx => {
//   message = ctx.body
  
// })

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started.");
});
