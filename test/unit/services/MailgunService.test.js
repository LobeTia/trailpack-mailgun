'use strict'
/* global describe, it */

const Chai   = require("chai")
const should = Chai.should()

describe('MailgunService', () => {
  it('should exist', () => {
    should.exist(global.app.api.services.MailgunService)
  })

  it("should return Mailgun instance", () => {
    global.app.services.MailgunService.getMailgunInstance().should.be.a("object")
  })
})
