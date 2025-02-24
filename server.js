const Restaurant = require('./models/Restaurant');

// Create a new restaurant
app.post('/restaurants', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (err) {
        res.status(400).send({ error: 'Validation failed: ' + err.message });
    }
});

// Get all restaurants
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
    } catch (err) {
        res.status(500).send({ error: 'Something went wrong' });
    }
});

// Get a specific restaurant by ID
app.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }
        res.send(restaurant);
    } catch (err) {
        res.status(500).send({ error: 'Something went wrong' });
    }
});

// Update a restaurant by ID
app.put('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!restaurant) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }
        res.send(restaurant);
    } catch (err) {
        res.status(400).send({ error: 'Validation failed: ' + err.message });
    }
});

// Delete a restaurant by ID
app.delete('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }
        res.send({ message: 'Restaurant deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Something went wrong' });
    }
});