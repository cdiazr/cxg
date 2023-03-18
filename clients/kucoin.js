export default class KucoinCXG {
    'use strict'

    constructor() {
        this.host = [
            'https://api.kucoin.com'
        ]

        this.public_endpoints = {
            'symbols': '/api/v2/symbols',
            'prices': '/api/v1/prices',
            'tickers': '/api/v1/market/allTickers',
        }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }

    getFilteredPrices(response) {
        let json = response.data.data

        return json
    }
}