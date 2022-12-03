import express from "express";
import * as dotenv from "dotenv";
import processRoute from "./routes/process.routes.js";
import connect from "./config/db.config.js";

dotenv.config();
const app = express();
app.use(express.json());

//conectando ao banco de dados mongo
connect()

app.use("/process", processRoute)

app.listen(process.env.PORT, () => {
  console.log(
    `Server App up and running on http://localhost:${process.env.PORT}`
  );
});