module.exports = class KucoinCXG {
    'use strict'

    constructor() {
        this.host = [
            'https://api.kucoin.com'
        ]

        this.public_endpoints = {
            'symbols': '/api/v2/symbols',
            'tickers': '/api/v1/market/allTickers'
        }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }
}