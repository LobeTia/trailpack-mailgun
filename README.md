# trailpack-mailgun
Send transational emails via [Mailgun](https://www.mailgun.com/) and [Trails](http://trailsjs.io)  
This project is built on top of the [Mailgun-Js](https://github.com/bojand/mailgun-js) library so you can refer to his documentation for additional information

## WARNING still work in progress, things can break

## Install

```sh
$ npm install --save trailpack-mailgun
yo trails:trailpack trailpack-mailgun
```

## Configure

### Add Trailpack
```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-mailgun')
  ]
}
```

### Configure Mailgun

```js
// config/mailgun.js
module.exports = {
  apiKey: "key-******",
  domain: "sandbox***.mailgun.org",
  defaultFrom: "Your name <your@email.here>",
  // you can use all mailgun-js options here
}
```

## Usage

Send email via `app.services.MailgunService.send`

```js
app.services.MailgunService.messagesSend({
  from:    "Your Email <your@email.it>", // optional if configured in config/mailgun.js
  to:      "target@email.com",
  subject: "Hello from trailpack-mailgun",
  text:    "Please, report issues"
}).then(app.log.silly).catch(app.log.error)
```

I'm still working on other features (list, webhook, etc) so for now you can access to the raw mailgun-js instance using
`app.services.MailgunService.getMailgunInstance()`

## Utils

You can configure the template render of your web server and easily send html email

Simply pass the webserver instance `app.services.MailgunService.configureTemplateRender(app.packs.express.server)`  
The first two parameters are passed to the render, the third to `MailgunService.messagesSend()

```js
app.services.MailgunService.messagesSendTemplate("email/hello", {}, {
  to: "target@email.com"
}).then(app.log.info).catch(app.log.error)
```
