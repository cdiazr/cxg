const axios = require('axios')
const fs = require('fs');

const BinanceCXG = require('./clients/binance')
const KucoinCXG = require('./clients/kucoin')
const BitgetCXG = require('./clients/bitget')

const activeExchanges = {
    'binance': BinanceCXG,
    'kucoin': KucoinCXG,
    'bitget': BitgetCXG
}

function getTablePrices(exchanges) {
    endpoints = []
    prices = []
    awaitingResponses = []
    exchanges.forEach(element => {
        let client = new activeExchanges[element]()
        let endpoint = axios.get(client.getDataRequested('tickers'))

        awaitingResponses.push(endpoint)
    });

    Promise.all(awaitingResponses).then((responses, k) => {
        responses.forEach(response => {

            let host = response.request.host
            exchanges.forEach(element => {

                if(host.includes(element))
                    currExchanger = element

                let data
                switch(currExchanger) {
                    case 'binance':
                        data = response.data
                        break
                    case 'kucoin':
                        data = response.data.ticker
                        break
                    case 'bitget':
                        data = response.data.data
                }

                prices[element] = data
            })
        });

        console.log(prices)
        return prices
    })
}

async function getPrices(endpoint) {
    return await axios.get(endpoint)
}

const res = getTablePrices(['binance', 'kucoin', 'bitget'])
//console.log(res)