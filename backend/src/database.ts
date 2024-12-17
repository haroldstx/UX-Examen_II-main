import { Sequelize} from 'sequelize';
import { Model } from 'sequelize';
import { DataTypes, Op, TinyIntegerDataType } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

//!Asociar el database.ts para hacer las interfaces, los modulos de las tablas y las relaciones

export const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        protocol: 'mysql',
        logging: false,
        dialectOptions: process.env.NODE_ENV === 'production' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false, 
            },
        } : {},
    })
    : new Sequelize(
        process.env.PGDATABASE || '',
        process.env.PGUSER || '',
        process.env.PGPASSWORD || '',
        {
            host: process.env.PGHOST || 'localhost',
            dialect: 'mysql',
            port: parseInt(process.env.PGPORT || '5433', 10),
            dialectOptions: process.env.NODE_ENV === 'production' ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            } : {},
        }
    );
    
    // Modelo de Restaurant
interface RestaurantAttributes {
    id: number; 
    name: string;
    descripcion?: string;
    scheduleTime: Date;
    reserved: boolean;
    reservedBy: string;
  }
  
  export const Restaurant = sequelize.define<Model<RestaurantAttributes, RestaurantAttributes>>('Restaurant', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
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
  
  //Modulo de Restaurant-Habilitado
  interface RestaurantHbailitadoAttributes {
    idHabilitado: number;
    restaurantId: number;
    scheduleTime: Date;
    reserved: boolean;
    reservedBy: string;
  }
  
  // Modelo de RestaurantHabilitado
  export const RestaurantHabilitado = sequelize.define<Model<RestaurantHbailitadoAttributes, RestaurantHbailitadoAttributes>>('RestaurantHabilitado', {
    idHabilitado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
      restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    //Relaciones
    Restaurant.hasMany(RestaurantHabilitado, { foreignKey: 'restaurantId' });
    RestaurantHabilitado.belongsTo(Restaurant, { foreignKey: 'Id' });

    export {Sequelize};

