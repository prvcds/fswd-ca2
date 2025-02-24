const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('./models/Restaurant'); 

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.post('/restaurants', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (err) {
        res.status(400).send({ error: 'Validation failed: ' + err.message });
    }
});

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.send(restaurants);
    } catch (err) {
        res.status(500).send({ error: 'Something went wrong' });
    }
});

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});