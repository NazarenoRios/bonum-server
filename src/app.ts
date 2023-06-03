//Configuracion del servidor
import "dotenv/config.js";
import "./models";
import express from "express";
import cors from "cors";
import corsConfig from "./config/cors";
import setHeaders from "./middleware/setHeaders";

//Database
import db from "./config/mongo";

// Express Route File Requires
import routes from "./routes";

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.json());
app.use("/", setHeaders);
app.use(cors(corsConfig));

// Express Routing
app.use("/api", routes);

db().then(() => {
  console.log("DB CONNECTED");
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
});
