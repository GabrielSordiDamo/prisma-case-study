import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { swaggerDocs } from "./config/swagger";
import partyRoutes from "./routes/party";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/parties", partyRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
