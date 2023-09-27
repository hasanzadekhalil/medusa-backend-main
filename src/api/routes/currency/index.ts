import { Router } from "express"
import axios from "axios"
import { CurrencyExchange } from "../../../models/currencyExchange"
import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import MoneyAmountRepository from "@medusajs/medusa/dist/repositories/money-amount"

const getExchangeRates = async () => {
    const url = `https://api.apilayer.com/fixer/latest?base=USD`
    const config = {
        headers: {
            apikey: 'Aj2a32gL2bxY8r0D5AwxiEELQZUVR4cq'
        }
    };
    // const response = await axios.get(url, config);
    // return response.data;
    return {
        "success": true, "timestamp": 1683122284, "base": "USD", "date": "2023-05-03", "rates": {
            "AED": 1234, "AFN": 987.198517, "ALL": 100.823661, "AMD": 386.979965, "ANG": 1.801723, "AOA": 510.000166, "ARS": 225.076102, "AUD": 1.50105, "AWG": 1.8, "AZN": 1.699624, "BAM": 1.77228, "BBD": 2.018667, "BDT": 106.483621, "BGN": 1.772022, "BHD": 0.377018, "BIF": 2082.642381, "BMD": 1, "BND": 1.331702, "BOB": 6.908238, "BRL": 5.033204, "BSD": 0.999773, "BTC": 0.000035198999, "BTN": 81.765026, "BWP": 13.189253, "BYN": 2.523492, "BYR": 19600, "BZD": 2.015224, "CAD": 1.363425, "CDF": 2093.999724, "CHF": 0.88814, "CLF": 0.029318, "CLP": 808.990184, "CNY": 6.912097, "COP": 4691.31, "CRC": 542.945425, "CUC": 1, "CUP": 26.5, "CVE": 99.913914, "CZK": 21.288972, "DJF": 178.00734, "DKK": 6.75028, "DOP": 54.5845, "DZD": 135.352966, "EGP": 30.951201, "ERN": 15, "ETB": 54.538197, "EUR": 1.1, "FJD": 2.2154, "FKP": 0.801719, "GBP": 0.79947, "GEL": 2.484951, "GGP": 0.801719, "GHS": 11.846576, "GIP": 0.801719, "GMD": 60.049949, "GNF": 8594.988899, "GTQ": 7.802575, "GYD": 211.442448, "HKD": 7.849965, "HNL": 24.568891, "HRK": 6.816133, "HTG": 151.964116, "HUF": 341.136996, "IDR": 14698.05, "ILS": 3.636905, "IMP": 0.801719, "INR": 81.769495, "IQD": 1309.682389, "IRR": 42249.999964, "ISK": 136.000203, "JEP": 0.801719, "JMD": 152.933714, "JOD": 0.709402, "JPY": 135.369499, "KES": 136.209202, "KGS": 87.519991, "KHR": 4119.43274, "KMF": 447.849711, "KPW": 900.011384, "KRW": 1333.710535, "KWD": 0.30628, "KYD": 0.833129, "KZT": 445.752345, "LAK": 17366.642202, "LBP": 15005.753844, "LKR": 319.70459, "LRD": 165.374994, "LSL": 18.510087, "LTL": 2.95274, "LVL": 0.60489, "LYD": 4.767342, "MAD": 10.022201, "MDL": 17.914843, "MGA": 4401.917344, "MKD": 55.849594, "MMK": 2099.497078, "MNT": 3495.332505, "MOP": 8.083562, "MRO": 356.999828, "MUR": 45.351351, "MVR": 15.360308, "MWK": 1026.177726, "MXN": 17.96551, "MYR": 4.452965, "MZN": 63.249804, "NAD": 18.509847, "NGN": 460.301249, "NIO": 36.563817, "NOK": 10.785103, "NPR": 130.824295, "NZD": 1.606445, "OMR": 0.384975, "PAB": 0.999773, "PEN": 3.713993, "PGK": 3.524081, "PHP": 55.319505, "PKR": 283.545365, "PLN": 4.15492, "PYG": 7185.90005, "QAR": 3.641019, "RON": 4.4666, "RSD": 106.264956, "RUB": 79.6545, "RWF": 1113.587966, "SAR": 3.750533, "SBD": 8.313845, "SCR": 13.166755, "SDG": 598.499211, "SEK": 10.269185, "SGD": 1.331955, "SHP": 1.21675, "SLE": 22.625406, "SLL": 19749.999765, "SOS": 568.496581, "SRD": 37.292219, "STD": 20697.981008, "SVC": 8.748131, "SYP": 2511.960279, "SZL": 18.300032, "THB": 34.010399, "TJS": 10.907526, "TMT": 3.51, "TND": 3.044996, "TOP": 2.35665, "TRY": 19.473604, "TTD": 6.787724, "TWD": 30.703947, "TZS": 2348.999749, "UAH": 36.925921, "UGX": 3723.437996, "USD": 1, "UYU": 38.792986, "UZS": 11435.82076, "VEF": 2471398.817936, "VES": 24.720885, "VND": 23465, "VUV": 119.360926, "WST": 2.731438, "XAF": 594.4452, "XAG": 0.039595, "XAU": 0.000496, "XCD": 2.70255, "XDR": 0.74351, "XOF": 594.4452, "XPF": 109.049932, "YER": 250.250419, "ZAR": 18.306901, "ZMK": 9001.209641, "ZMW": 17.819701, "ZWL": 321.999592
        }
    }
}

export const setRates = (rootDirectory, pluginOptions) => {
    const router = Router()

    router.get("/set-product-rates", async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");

        try {
            const exchange = (await getExchangeRates()).rates;
            const v_ids = await MoneyAmountRepository.query(
                `
            select distinct variant_id from money_amount;
            `
            )
            for (let i = 0; i < v_ids.length; i++) {
                const vid = await MoneyAmountRepository.query(
                    `
                select * from money_amount where variant_id = '${v_ids[i].variant_id}'
                `
                )
                const currencyCodes = []
                let usdValue = 0;
                for (let j = 0; j < vid.length; j++) {
                    currencyCodes.push(vid[j].currency_code.toUpperCase());
                    if (vid[j].currency_code === 'usd') {
                        usdValue = vid[j].amount;
                    }
                }
                for (let k = 0; k < currencyCodes.length; k++) {
                    const exchangeValues = exchange[currencyCodes[k]];
                    // if(currencyCodes[k].toLowerCase() !== 'inr')
                    await MoneyAmountRepository.query(
                        `
                    update money_amount set 
                    amount = ${usdValue}*${exchangeValues}
                    where 
                    variant_id = '${vid[0].variant_id}' 
                    and 
                    currency_code = '${currencyCodes[k].toLowerCase()}'
                    `
                    )
                }
            }
            return res.status(200).json({
                status: "success"
            })
        } catch (err) {
            return res.status(501).json({
                status: "fail"
            })
        }
    })
    return router
}

// export const getRates = (rootDirectory, pluginOptions) => {
//     const router = Router()

//     router.get("/refresh-currency-rates", async (req, res) => {
//         const exchangeRates = await getExchangeRates();
//         const currencyExchangeRepository = dataSource.getRepository(CurrencyExchange);
//         if (exchangeRates.success === true) {
//             for (const key in exchangeRates["rates"]) {
//                 await currencyExchangeRepository.upsert({
//                     targetCurrency: key,
//                     exchangeRate: (exchangeRates["rates"][key]).toFixed(3)
//                 }, ['targetCurrency']);
//             }
//             return res.json({
//                 message: 'success',
//             })

//         } else {
//             console.log("ERROR");
//             return res.json({
//                 message: 'fail',
//             })
//         }
//     });

//     router.get("/currency-exchange-rate", async (req, res) => {
//         res.header("Access-Control-Allow-Origin", "*");
//         let targetCurrency = req.query.target
//         if (targetCurrency) targetCurrency = targetCurrency.toString();
//         else return res.status(404).json({
//             message: 'fail',
//         })
//         const currencyExchangeRepository = dataSource.getRepository(CurrencyExchange);
//         const exchange = await currencyExchangeRepository.findOne({ where: { targetCurrency } })
//         if (exchange !== undefined && exchange !== null) {
//             return res.status(200).json({
//                 baseCurrency: 'USD',
//                 targetCurrency: exchange.targetCurrency,
//                 exchangeRate: exchange.exchangeRate
//             })
//         } else {
//             return res.status(404).json({
//                 message: 'fail',
//             })
//         }
//     })
//     return router
// }