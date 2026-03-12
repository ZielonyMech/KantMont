import { APIgetAvailableCurrencies, APIgetCurrencyRates } from '../scripts/apiFacade.js';
import { toggleActive } from '../scripts/misc.js';

function formatRate(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return String(value);
    if (num === 0) return '0';

    const abs = Math.abs(num);
    if (abs < 0.0001) return num.toExponential(4);
    if (abs < 1) return num.toFixed(6);
    if (abs < 1000) return num.toFixed(4);
    return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function renderRates({ date, base, ratesArr }, selectedCurrencyCode) {
    const container = document.querySelector('.exchangeRates');
    if (!container) return;

    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'ratesHeader';
    header.textContent = `Kursy dla ${selectedCurrencyCode?.toUpperCase()} (data: ${date}, baza: ${base?.toUpperCase()})`;

    const grid = document.createElement('div');
    grid.className = 'ratesGrid';

    const frag = document.createDocumentFragment();

    [...ratesArr]
        .sort((a, b) => a.code.localeCompare(b.code))
        .forEach(({ code, value }) => {
            const card = document.createElement('div');
            card.className = 'rateCard';
            card.dataset.code = code;

            const codeEl = document.createElement('div');
            codeEl.className = 'rateCode';
            codeEl.textContent = code.toUpperCase();

            const valueEl = document.createElement('div');
            valueEl.className = 'rateValue';
            valueEl.textContent = formatRate(value);

            card.append(codeEl, valueEl);
            frag.appendChild(card);
        });

    grid.appendChild(frag);
    container.append(header, grid);
}

async function getCurrencyRates(currency) {
    const exchangeValues = await APIgetCurrencyRates(currency);
    renderRates(exchangeValues, currency);
}

async function searchCurrency(value) {
    const currencies = await APIgetAvailableCurrencies();
    
    const currenciesContainer = document.querySelector('.availableCurrencies');
    currenciesContainer.innerHTML = "";

    const filteredCurrencies = currencies.filter(currency => currency.name.toLowerCase().trim().includes(value.toLowerCase().trim()));

    filteredCurrencies.forEach(currency => {
        currenciesContainer.appendChild(createCurrencyElement(currenciesContainer, currency));
    });
}

function createCurrencyElement(root, currency) {
    const currencyElement = document.createElement('div');
    currencyElement.className = 'currencyCard';
    currencyElement.textContent = currency.name;

    currencyElement.addEventListener('click', (elem) => {       
        toggleActive(root, elem.target, "selected");
        getCurrencyRates(currency.code);
    });

    return currencyElement;
}

const currencyInput = document.querySelector('#currency');

if (currencyInput) {
    currencyInput.addEventListener('input', (e) => {
        searchCurrency(e.target.value);
    });
}

searchCurrency("");