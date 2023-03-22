export default class KucoinCXG {
    'use strict'

    constructor() {
        this.host = [
            'https://api.kucoin.com'
        ]

        this.version = '/api/v1'
        this.version2 = '/api/v2'

        this.public_endpoints = {
            'symbols': this.version2 + '/symbols',
            'prices': this.version + '/prices',
            'tickers': this.version + '/market/allTickers',
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