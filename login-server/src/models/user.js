import { client } from '../utils/db.js' 
import { DataTypes } from 'sequelize';

export const User = client.define('user', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
  }
})