import express, { Express } from "express";
import moment from "moment";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

import clientRoutes from "./routes/client/index.route";

const app: Express = express();
const port: (number | string) = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());

// App Local Variables
app.locals.moment = moment;

// Routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});