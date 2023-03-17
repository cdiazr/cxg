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


async function getTablePrices(exchanges) {
    endpoints = []
    prices = []
    awaitingResponses = []
    exchanges.forEach(element => {
        let client = new activeExchanges[element]()
        let endpoint = axios.get(client.getDataRequested('tickers'))

        awaitingResponses.push(endpoint)
    });

    const data = await Promise.all(awaitingResponses);

    data.forEach(response => {

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
                case 'bitget':
                    data = response.data.data
            }
            getData('prices_' + element, data)
            prices[element] = data
        })
    });
    return prices

}
getTablePrices(['binance', 'kucoin', 'bitget']).then( precios => {

    //Lo que sea que vayas a hacer con estos precios debes hacerlo dentro de este then, esta info no puede existir fuera de aqui 
    console.log(precios)

})

async function getPrices(endpoint) {
    return await axios.get(endpoint)
}

function getData(filename, exchanges) {
    fs.writeFile(`${filename}.json`, JSON.stringify(exchanges), function(err) {
        if(err)
            return console.log(err);

        console.log("The file was saved!");
    });
}
