import{
Restaurant,
RestaurantHabilitado
} from "./database";

async function poblarRestaurante(): Promise<void>{

    const RestauranteExist = await Restaurant.count();
    const Res = await RestaurantHabilitado.count();
    
    try{
        if(RestauranteExist === 0){

            const Restaurantes = [{
                name: "La Casca",
                descripcion: "Consumo en el lugar, Terraza o al aire libre",
                scheduleTime: new Date(),
                reserved: false,
                reservedBy: "",
            },
            {
                name: "Portal De Las Carnes",
                descripcion: "Restaurante 2",
                scheduleTime: new Date(),
                reserved: false,
                reservedBy: "",
            },
            {
                name: "Factory Steak & Lobster\n",
                descripcion: "Restaurante 3",
                scheduleTime: new Date(),
                reserved: false,
                reservedBy: "",
            }];
            console.log("Se ha poblado la tabla Restaurante");
        }

        if(Res === 0){
            const RestaurantesHabilitados = [{
                id: 1, 
                scheduleTime: '2023-06-20 08:00:00',
                reserved: 0,
                reservedBy: "NULL",
            },
            {
                id: 1, 
                scheduleTime: '2023-06-20 09:00:00',
                reserved: false,
                reservedBy: "",
            },
            {
                id: 2, 
                scheduleTime: '2023-06-21 10:00:00',
                reserved: false,
                reservedBy: "",
            },
            {
                id: 2, 
                scheduleTime: '2023-06-21 11:00:00',
                reserved: false,
                reservedBy: "",
            },
            {
                id: 3, 
                scheduleTime: '2023-06-22 07:00:00',
                reserved: false,
                reservedBy: "",
            },
            {
                id: 3, 
                scheduleTime: '2023-06-22 09:00:00',
                reserved: false,
                reservedBy: "",
            },
        ];
                console.log("Se ha poblado la tabla RestauranteHabilitado");
            }
            
        } catch(error){
            console.error("Error al poblar la tabla Restaurante", error);
        }
    
}

export { poblarRestaurante };