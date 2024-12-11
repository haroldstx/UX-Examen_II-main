import React, { useState, useEffect } from "react";
import RestaurantCard from "./Restaurants_Cards";
function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("/restaurants")
            .then(response => response.json())
            .then(data => setRestaurants(data))
            .catch(error => console.error("Error fetching restaurants:", error));
    }, []);

    return (
        <div>
            <h1>Welcome to my Restaurantes</h1>
            
            {restaurants.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
            ))}
            <ul>
                {restaurants.map((restaurant, index) => (
                    <li key={index}>{restaurant.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Restaurants;
