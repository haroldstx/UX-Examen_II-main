import { Router, request, response } from "express";
import { Restaurant, RestaurantHabilitado } from "../database";
import { Op } from "sequelize";
import cors from 'cors';


export const router = Router();
router.use(cors());

//TEST para validar las rutas
router.get('/test', (req, res) => {
    res.json({ message: 'Test route' });
});

// Ruta GET /restaurants
router.get('/', async (req, res) => {
    try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
    } catch (error) {
    res.status(500).json({ error: 'Error fetching restaurants' });
    }
});

// Ruta para obtener la disponibilidad de un restaurante
router.get('/availability/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Calcula el inicio del año actual
      const availableRestaurants = await RestaurantHabilitado.findAll({
        where: {
          restaurantId: id, 
          reserved: false, 
        },
      });


    if (availableRestaurants.length === 0) {
        return res.status(404).json({ message: 'No hay disponibilidad para el restaurante con ese ID.' });
    }
    console.log('Restaurantes habilitados encontrados:', availableRestaurants);

    res.status(200).json(availableRestaurants);
    } catch (error) {
    console.error('Error al obtener la disponibilidad:', error);
    res.status(500).json({ error: 'Error al obtener la disponibilidad.' });
    }
});

  //Post para reservar
  router.post('/reserve', async (req, res) => {
    try {
      const { restaurantId, scheduleTime, reservedBy } = req.body;
  
      if (!restaurantId || !scheduleTime || !reservedBy) {
        return res.status(400).json({ error: 'Faltan parámetros necesarios.' });
      }
  
      const restaurantHabilitado = await RestaurantHabilitado.findOne({
        where: {
          restaurantId: restaurantId,
          scheduleTime: new Date(scheduleTime), 
          reserved: false,
        },
      });
      
  
      if (!restaurantHabilitado) {
        return res.status(404).json({
          message: 'No se encontró disponibilidad para el horario seleccionado.',
        });
      }
  
      restaurantHabilitado.set('reserved', true);
      restaurantHabilitado.set('reservedBy', reservedBy);
  
      await restaurantHabilitado.save();
  
      res.status(200).json({
        message: 'Reservación realizada con éxito.',
        data: restaurantHabilitado,
      });
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      res.status(500).json({ error: 'Error al realizar la reserva.' });
    }
  });    
  
export default router;
