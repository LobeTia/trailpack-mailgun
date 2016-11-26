# trailpack-mailgun
Send transational emails via [Mailgun](https://www.mailgun.com/) and [Trails](http://trailsjs.io)
This project is built on top of the [Mailgun-Js](https://github.com/bojand/mailgun-js) library

## Install

```sh
$ npm install --save trailpack-mailgun
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

Send email via `app.services.MailgunService.Send`

```
app.services.KueService.addJob("send_email", {
      from:    "Your Email <your@email.it>",
      to:      "target@email.com",
      subject: "Hello from trailpack-mailgun",
      text:    "Please, report issues"
    })
```

I'm still working on other features (list, webhook, etc) so for now you can access to the raw mailgun-js instance using
`app.services.MailgunService.Raw`
