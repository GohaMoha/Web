app.get('/exchange-rates', async (req, res) => {
    try {
        const apiKey = '07987c7287ba4d239cecdab7bd6df67e'; // 
        const response = await fetch(`https://open.er-api.com/v6/latest/?apikey=${apiKey}`);

        if (!response.ok) {
            console.error(`Error fetching exchange rates. Status: ${response.status}`);
            return res.status(response.status).send('Failed to fetch exchange rates');
        }

        const data = await response.json();
        res.json(data.rates);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        res.status(500).send('Internal Server Error');
    }
});
