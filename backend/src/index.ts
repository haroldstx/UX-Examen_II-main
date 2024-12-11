import express from 'express';
import cors from 'cors';
import { sequelize } from './database';
import { DataTypes, Op } from 'sequelize';
import { Model } from 'sequelize';
require('dotenv').config();

// Modelo de Restaurant
interface RestaurantAttributes {
  id?: number;
  name: string;
  scheduleTime: Date;
  reserved: boolean;
  reservedBy?: string;
}

const Restaurant = sequelize.define<Model<RestaurantAttributes, RestaurantAttributes>>('Restaurant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scheduleTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reserved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reservedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Sincronización de la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas creadas');
    app.listen(port, () => {
      console.log(`El servidor está corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:\n', error);
  });

// Ruta GET /restaurants
app.get('/restaurants', async (req, res) => {
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
app.get('/restaurants/availability', async (req, res) => {
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
app.put('/restaurants/reserve', async (req, res) => {
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
