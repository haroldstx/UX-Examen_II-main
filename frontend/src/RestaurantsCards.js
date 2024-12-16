import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const RestaurantCard = ({ restaurant }) => {
  const [showAvailability, setShowAvailability] = useState(false);
  const [availability, setAvailability] = useState([]); // Guarda los registros de horarios disponibles
  const [selectedTime, setSelectedTime] = useState(null); // Almacena la fecha seleccionada
  const [userName, setUserName] = useState(''); // Almacena el nombre del usuario

  // Función para obtener los horarios disponibles
  const fetchAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/restaurants/availability/${restaurant.id}`
      );
      setAvailability(response.data); 
      setShowAvailability(true);
    } catch (error) {
      console.error('Error al cargar la disponibilidad:', error);
      alert('No se pudo obtener la disponibilidad.');
    }
  };

  // Función para reservar un horario
  const handleReserve = async () => {
    try {
      await axios.post('http://localhost:8000/restaurants/reserve', {
        restaurantId: restaurant.id,
        scheduleTime: selectedTime,
        reservedBy: userName,
      });
      alert(`Reserva exitosa para ${userName} a las ${selectedTime}`);
      setShowAvailability(false);
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      alert('Error al realizar la reserva.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.descripcion}</Card.Text>
        <Button variant="primary" onClick={fetchAvailability}>
          Ver disponibilidad
        </Button>

        {showAvailability && (
          <div className="mt-3">
            <h5>Horarios disponibles</h5>
            {availability.length > 0 ? (
              <Form>
                {availability.map((item, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    label={`Horario: ${new Date(item.scheduleTime).toLocaleTimeString()}`}
                    name="scheduleTime"
                    onChange={() => setSelectedTime(item.scheduleTime)} 
                  />
                ))}
                <Form.Group controlId="userName" className="mt-3">
                  <Form.Label>Tu nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} 
                  />
                </Form.Group>
                <Button
                  className="mt-2"
                  variant="success"
                  onClick={handleReserve}
                  disabled={!selectedTime || !userName} 
                >
                  Reservar
                </Button>
                
              </Form>
            ) : (
              <p>No hay horarios disponibles.</p>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
