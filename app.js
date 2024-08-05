import express from "express";
import routes from "./router/routes.js"; 

const app = express();
app.use(express.json());

app.use("/", routes); 

app.listen(3003, () => {
  console.log("Server started on port 3003");
});