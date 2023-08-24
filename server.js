const express = require ('express');
const axios = require ('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors())

app.get('/api/items', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({error: 'missing query param'});
    }

    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`);
        const data = response.data;

        const items = data.results.map((item) => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: (item.price % 1).toFixed(2) * 100,
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            address: item.address.state_name,
        }));

        const categories = data.available_filters.find((filter) => filter.id === 'category')?.values[0].path_from_root.map((category) => category.name);

        const formattedData = {
            author: {
                name: 'Antonella',
                surname: 'Ravaioli'
            },
            categories: categories,
            items: items,
        };

        res.json(formattedData);
    }
    catch (error) {
        console.error('error fetching data', error);
        res.status(500).json({error: 'filed to fetch data'});
    }

    app.get('/api/items/:id', async (req, res) =>{
        const itemId = req.params.id;

        try {
            const [itemResponse, descriptionResponse] = await Promise.all([
                axios.get(`https://api.mercadolibre.com/items/${itemId}`),
                axios.get(`https://api.mercadolibre.com/items/${itemId}/description`),
            ]);

            const itemData = itemResponse.data;
            const descriptionData = descriptionResponse.data;

            const formattedItem = {
                id: itemData.id,
                title: itemData.title,
                price: {
                    currency: itemData.currency_id,
                    amount: Math.floor(itemData.price),
                    decimals: (itemData.price % 1).toFixed(2) * 100,
                },
                picture: itemData.thumbnail,
                condition: itemData.condition,
                free_shipping: itemData.shipping.free_shipping,
                sold_quantity: itemData.sold_quantity,
                description: descriptionData.plain_text,
            };

            const formattedData = {
                author: {
                    name: 'Antonella',
                    surname: 'Ravaioli'
                },
                item: formattedItem,
            }

            res.json(formattedData);
        }
        catch (error) {
            console.error('error fetching data', error);
            res.status(500).json({error: 'filed to fetch data'});
        }
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
