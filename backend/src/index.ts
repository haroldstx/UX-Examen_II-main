import express from 'express';
import cors from 'cors';
import { sequelize } from './database';
import RestaurantRoutes from './Routes/RestauranteRoutes';
import {poblarRestaurante} from './PoblarRestaurante';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

// Rutas
app.use('/restaurants', RestaurantRoutes);

// Sincronización de la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas creadas');
    app.listen(port, () => {
      console.log(`El servidor está corriendo en el puerto ${port}`);
    poblarRestaurante();
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:\n', error);
  });
