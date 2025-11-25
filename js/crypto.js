export function initCrypto() {
    const btcPriceEl = document.getElementById('btcPrice');
    const ethPriceEl = document.getElementById('ethPrice');
    const btcChangeEl = document.getElementById('btcChange');
    const ethChangeEl = document.getElementById('ethChange');

    async function fetchCryptoPrices() {
        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
            );
            const data = await response.json();

            // Bitcoin
            const btcPrice = data.bitcoin.usd;
            const btcChange = data.bitcoin.usd_24h_change;
            btcPriceEl.textContent = `$${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
            btcChangeEl.textContent = `${btcChange >= 0 ? '+' : ''}${btcChange.toFixed(2)}%`;
            btcChangeEl.className = `crypto-change ${btcChange >= 0 ? 'positive' : 'negative'}`;

            // Ethereum
            const ethPrice = data.ethereum.usd;
            const ethChange = data.ethereum.usd_24h_change;
            ethPriceEl.textContent = `$${ethPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
            ethChangeEl.textContent = `${ethChange >= 0 ? '+' : ''}${ethChange.toFixed(2)}%`;
            ethChangeEl.className = `crypto-change ${ethChange >= 0 ? 'positive' : 'negative'}`;

        } catch (error) {
            console.error('Crypto fetch error:', error);
            btcPriceEl.textContent = 'Offline';
            ethPriceEl.textContent = 'Offline';
        }
    }

    // Initial fetch
    fetchCryptoPrices();

    // Update every 60 seconds
    setInterval(fetchCryptoPrices, 60000);
}
