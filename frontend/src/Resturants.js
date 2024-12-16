// Importar las dependencias necesarias
import React, { useEffect, useState } from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

// Slice de Redux para restaurantes
const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: [],
    reducers: {
      setRestaurants: (state, action) => action.payload,
    },
  });
  
  const { setRestaurants } = restaurantsSlice.actions;
  const store = configureStore({
    reducer: {
      restaurants: restaurantsSlice.reducer,
    },
  });
  

// Crear el componente Restaurants
const Restaurants = () => {
  // Estado para almacenar la lista de restaurantes
  const [restaurants, setRestaurants] = useState([]);

  // Estado para manejar posibles errores
  const [error, setError] = useState(null);

  // useEffect para hacer la petición al endpoint
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Hacer la petición al endpoint
        const response = await axios.get('/restaurants');
        // Actualizar el estado con los datos recibidos
        setRestaurants(response.data);
      } catch (err) {
        // Manejar errores
        setError('Error al cargar los restaurantes.');
      }
    };

    fetchRestaurants();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  return (
    <div>
      <h1>Lista de Restaurantes</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
      <ul>
        {/* Usar .map() para renderizar la lista de restaurantes */}
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Exportar el componente
export default Restaurants;
