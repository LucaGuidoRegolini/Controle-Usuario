import { createConnection } from "typeorm";

import Admin from "../model/Admin";
import User from "../model/User";

createConnection({
  name: "default",
  type: "sqlite",
  database: "./data/db.sq3",
  logging: false,
  entities: [Admin, User],
}).then(() => console.log("📖 Successfully connected with database"));
