# trailpack-mailgun
Send transational emails via [Mailgun](https://www.mailgun.com/) and [Trails](http://trailsjs.io)  
This project is built on top of the [Mailgun-Js](https://github.com/bojand/mailgun-js) library

## WARNING still work in progress, things can break

## Install

```sh
$ npm install --save trailpack-mailgun
yo trail:trailpack trailpack-mailgun
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
  domain: "sandbox***.mailgun.org"
  // you can use all mailgun-js options here
}
```

## Usage

Send email via `app.services.MailgunService.send`

```
app.services.MailgunService.send({
  from:    "Your Email <your@email.it>",
  to:      "target@email.com",
  subject: "Hello from trailpack-mailgun",
  text:    "Please, report issues"
})
```

I'm still working on other features (list, webhook, etc) so for now you can access to the raw mailgun-js instance using
`app.services.MailgunService.Raw`
