export default class KrakenCXG {
    'use strict'

    constructor() {
        this.host = [
            'https://api.kraken.com'
        ]

        this.version = '/0/public'
        this.public_endpoints = {
            'assets': this.version + '/Assets',
            'status': this.version + '/SystemStatus',
            'time': this.version + '/Time',
        }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }
}