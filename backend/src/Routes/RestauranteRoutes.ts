import { Router, request, response } from "express";
import { Restaurant } from "../database";
import { Op } from "sequelize";

export const router = Router();

// Ruta GET /restaurants
router.get('/restaurants', async (req, res) => {
    try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const restaurants = await Restaurant.findAll({ limit, offset });
    res.status(200).json(restaurants);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener los restaurantes.' });
    }
});

  // Ruta GET /restaurants/availability
router.get('/restaurants/availability', async (req, res) => {
    try {
    const currentDate = new Date();
    const availableRestaurants = await Restaurant.findAll({
        where: {
        scheduleTime: {
            [Op.gt]: currentDate,
        },
        reserved: false,
        },
    });

    res.status(200).json(availableRestaurants);
    } catch (error) {
    res.status(500).json({ error: 'Error al obtener la disponibilidad de los restaurantes.' });
    }
});

  // Ruta PUT /restaurants/reserve
router.put('/restaurants/reserve', async (req, res) => {
    try {
    const { personName, scheduleTime, restaurantId } = req.body;
    if (!personName || !scheduleTime || !restaurantId) {
        return res.status(400).json({ error: 'Faltan parámetros necesarios.' });
    }
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante no encontrado.' });
    }

    if (restaurant.get('reserved')) {
        return res.status(400).json({ error: 'El restaurante ya está reservado.' });
    }
    restaurant.set('reserved', true);
    restaurant.set('reservedBy', personName);
    restaurant.set('scheduleTime', scheduleTime);

    await restaurant.save();
    res.status(200).json({ message: 'Restaurante reservado con éxito.' });
    } catch (error) {
    res.status(500).json({ error: 'Error al reservar el restaurante.' });
    }
});

export default router;
