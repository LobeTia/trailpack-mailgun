'use strict'
/* global describe, it */

const assert = require('assert')

describe('MailgunService', () => {
  it('should exist', () => {
    assert(global.app.api.services['MailgunService'])
  })
})
