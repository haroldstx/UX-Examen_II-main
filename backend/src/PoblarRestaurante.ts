import { Restaurant, RestaurantHabilitado } from "./database";

async function poblarRestaurante(): Promise<void> {
  try {
    const RestauranteExist = await Restaurant.count();
    const Res = await RestaurantHabilitado.count();

    if (RestauranteExist === 0) {
      const Restaurantes = [
        {
          id: 1,
          name: "La Casca",
          descripcion: "Consumo en el lugar, Terraza o al aire libre",
          scheduleTime: new Date(),
          reserved: false,
          reservedBy: "",
        },
        {
          id: 2,
          name: "Portal De Las Carnes",
          descripcion: "Disfrute de las mejores carnes y vinos en un ambiente único de la ciudad de San Pedro Sula",
          scheduleTime: new Date(),
          reserved: false,
          reservedBy: "",
        },
        {
          id: 3,
          name: "Factory Steak & Lobster",
          descripcion: "Experience the best steak and lobster in San Pedro Sula at Factory Steak and Lobster",
          scheduleTime: new Date(),
          reserved: false,
          reservedBy: "",
        },
      ];
      await Restaurant.bulkCreate(Restaurantes);
      console.log("Se ha poblado la tabla Restaurante");
    }

    if (Res === 0) {
      const RestaurantesHabilitados = [
        {
          idHabilitado: 1,
          restaurantId: 1,
          scheduleTime: new Date("2024-12-15T18:19:00Z".replace(" ", "T")),
          reserved: false,
          reservedBy: "",
        },
        {
          idHabilitado: 2,
          restaurantId: 1,
          scheduleTime: new Date("2024-12-20T08:00:00Z".replace(" ", "T")),
          reserved: false,
          reservedBy: "",
        },
        {
          idHabilitado: 3,
          restaurantId: 2,
          scheduleTime: new Date("2024-12-21T10:00:00Z".replace(" ", "T")),
          reserved: false,
          reservedBy: "",
        },
        {
          idHabilitado: 4,
          restaurantId: 2,
          scheduleTime: new Date("2024-12-21T11:00:00Z".replace(" ", "T")),
          reserved: false,
          reservedBy: "",
        },
        {
          idHabilitado: 5,
          restaurantId: 3,
          scheduleTime: new Date("2024-12-22T07:00:00Z".replace(" ", "T")),
          reserved: false,
          reservedBy: "",
        },
        {
          idHabilitado: 6,
          restaurantId: 3,
          scheduleTime: new Date("2024-12-22T09:00:00Z".replace(" ", "T")),
          reserved: false,
          reservedBy: "",
        },
      ];

      await RestaurantHabilitado.bulkCreate(RestaurantesHabilitados);
      console.log("Se ha poblado la tabla RestauranteHabilitado");
    }
  } catch (error) {
    console.error("Error al poblar las tablas:", error);
  }
}

export { poblarRestaurante };
