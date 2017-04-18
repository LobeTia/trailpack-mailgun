'use strict'

const Service = require('trails-service')
const _ = require('lodash')
/**
 * @module MailgunService
 * @description TODO document Service
 */
module.exports = class MailgunService extends Service {
  init() {
    const config = this.app.config.mailgun

    this.mailgunInstance = require('mailgun-js')(config)
    this.templateRender = null
  }

  messagesSend(data) {
    return new Promise((fullfill, reject) => {
      data.from = data.from || this.app.config.mailgun.defaultFrom

      this.mailgunInstance.messages().send(data, function (error, body) {
        if (error) reject(error)
        fullfill(body)
      })
    })
  }

  messagesSendTemplate(templateName, templateOptions, mailgunOptions) {
    if (!this.templateRender) throw new Error('should configure a templateRender first')

    return this._renderTemplate(templateName, templateOptions)
      .then(render => {
        return this.messagesSend(
          _.extend({
            subject: render.subject,
            html: render.html
          }, mailgunOptions)
        )
      })
  }

  _renderTemplate(name, options) {
    return new Promise((fullfill, reject) => {
      this.templateRender.render(name, options, (error, render) => {
        if (error) reject(error)
        else {
          fullfill({
            subject: render.match(/<title[^>]*>(.*?)<\/title>/i)[1] || null,
            html: render
          })
        }
      })
    })
  }

  configureTemplateRender(templateRender) {
    if (!templateRender)
      throw new Error('you must pass a valid templateRender')
    if (typeof templateRender.render !== 'function')
      throw new Error("this templateRender doesn't seems to have a .render method")
    this.templateRender = templateRender
    return true
  }

  getMailgunInstance() {
    return this.mailgunInstance
  }
}

