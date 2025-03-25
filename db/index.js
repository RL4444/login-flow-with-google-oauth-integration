import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "/data.db",
  define: {
    freezeTableName: true,
  },
});

export default db;
