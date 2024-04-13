import express, { Express } from "express";
import moment from "moment";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";
import { systemConfig } from "./config/system";

const app: Express = express();
const port: (number | string) = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// App Local Variables
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
adminRoutes(app);
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});