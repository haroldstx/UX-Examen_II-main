// Importar las dependencias necesarias
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// Componente RestaurantCard
const RestaurantCard = ({ restaurant }) => {
  const [showAvailability, setShowAvailability] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState('');
  const [name, setName] = React.useState('');

  const handleReserve = async () => {
    try {
      await axios.post(`/restaurants/reserve`, {
        restaurantId: restaurant.id,
        time: selectedTime,
        name,
      });
      alert('Reserva realizada con éxito');
    } catch (error) {
      alert('Error al realizar la reserva');
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.description}</Card.Text>
        <Button onClick={() => setShowAvailability(!showAvailability)}>
          Ver disponibilidad
        </Button>
        {showAvailability && (
          <div className="mt-3">
            <Form>
              {restaurant.availability.map((time, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  label={time}
                  name="availability"
                  onChange={() => setSelectedTime(time)}
                />
              ))}
              <Form.Group controlId="nameInput" className="mt-3">
                <Form.Label>Tu nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Button
                className="mt-3"
                onClick={handleReserve}
                disabled={!selectedTime || !name}
              >
                Reservar
              </Button>
            </Form>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};