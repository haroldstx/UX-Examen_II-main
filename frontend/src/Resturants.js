import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import RestaurantCard from './RestaurantsCards';


// Crear el componente Restaurants
const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  // useEffect para obtener la lista de restaurantes
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8000/restaurants');
        setRestaurants(response.data);
        if (response.data.length === 0) {
          setError('No hay restaurantes en la ruta');
        }
      } catch (err) {
        setError('Error al cargar los restaurantes.');
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Lista de Restaurantes</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <Row>
        {restaurants.map((restaurant) => (
          restaurant && (
            <Col key={restaurant.id} sm={12} md={6} lg={4} className="mb-4">
              <RestaurantCard restaurant={restaurant} />
            </Col>
          )
        ))}
      </Row>
    </Container>
  );
};
// Exportar el componente
export default Restaurants;
