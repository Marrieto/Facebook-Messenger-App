const Koa = require("koa");
const json = require("koa-json");
const KoaRouter = require("koa-router");
const BodyParser = require('koa-bodyparser')
const request = require('request')
const dotenv = require('dotenv').config()

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

// ID = 1082478417 Vanlig facebook
// Page ID = 2047025908699136

// test route
router.get("/", ctx => {
  console.log(ctx)

  let request_body = {
    "messaging_type": "UPDATE",
    "recipient": {"id": 2047025908699136},
    "message": {text: 'Test'}
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    // "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "qs": { "access_token": "EAAeatq63GxwBAD8rMoK3rf5rs7tJgke3QmtyFdTrhQU1ctGK3RURnbSAEasSQE82lDItTwjU2ZApFydkgy6xaHyZAy5aOzD4IYVMZCxYXzqnHpL1iombkkSo31okPt4QjpuOEO3oY9JN0KHX9vS9qxXgCoqbWfmBoYQCJcC9gZDZD" },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log(res)
      console.log(body);
      
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
  ctx.body = 'Your message has been sent'
});

// To verify the webhook
// router.get('/hook', ctx => {
//   console.log(ctx)
//   let responseNumber = ctx.query['hub.challenge']
//   // let responseToken = ctx.query['hub.verify_token']
//   // let responseHeaders = [responseNumber, responseToken]
//   ctx.body = responseNumber
// })

router.post('/hook', async ctx => {
  let messaging_events = await ctx.request.body
  console.log(messaging_events)
  // console.log(messaging_events);
  
  // let responseNumber = ctx.query['hub.challenge']
  // let responseToken = ctx.query['hub.verify_token']
  // let responseHeaders = [responseNumber, responseToken]

  ctx.body = 20
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
