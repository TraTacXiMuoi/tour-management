import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
   process.env.DATABASE_NAME, // Tên database
   process.env.DATABASE_USERNAME, // Username
   process.env.DATABASE_PASSWORD, // Password
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connect success.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

export default sequelize;