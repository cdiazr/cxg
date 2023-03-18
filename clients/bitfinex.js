export default class BitfinexCXG {
    'use strict'

    constructor() {
      this.host = [
        'https://api-pub.bitfinex.com'
      ]

      this.public_endpoints = {
        'status': '/v2/platform/status',
        'symbols': '/v2/tickers?symbols=ALL',
        'prices': '/api/spot/v1/market/tickers'
      }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }
}