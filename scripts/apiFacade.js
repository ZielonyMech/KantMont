import { config } from './config/config.js';
import { withLoading } from './misc.js';

export async function APIgetAvailableCurrencies() {
    return withLoading(async () => {
        const response = await fetch(config.endpoints.currencies);
        const data = await response.json();
        return Object.keys(data).map(elem => ({
            code: elem,
            name: data[elem]
        }));
    });
}

export async function APIgetCurrencyRates(currencyCode) {
    return withLoading(async () => {
        const response = await fetch(`${config.endpoints.currencyRates}/${currencyCode}.json`);
        const data = await response.json();

        const date = data.date;

        const [base, ratesObj] = Object.entries(data).find(([k]) => k !== "date") ?? [];
        const ratesArr = Object.entries(ratesObj ?? {}).map(([code, value]) => ({
            code,
            value,
        }));
        return { date, base, ratesObj, ratesArr };
    })  
}