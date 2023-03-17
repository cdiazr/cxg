module.exports = class BitgetCXG {
    'use strict'

    constructor() {
      this.host = [
        'https://api.bitget.com'
      ]

      this.public_endpoints = {
        'symbols': '/api/spot/v1/public/currencies',
        'tickers': '/api/spot/v1/market/tickers'
    }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }
}