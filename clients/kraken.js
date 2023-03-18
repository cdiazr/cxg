export default class KrakenCXG {
    'use strict'

    constructor() {
        this.host = [
            'https://api.kraken.com'
        ]

        this.public_endpoints = {
            'assets': '/0/public/Assets',
            'status': '/0/public/SystemStatus',
            'time': '/0/public/Time',
        }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }
}