const express = require("express");
const dotenv = require("dotenv");
const imgRoutes = require("./routes/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// parse JSON bodies
app.use(express.json());

// Api routes
app.use("/api", imgRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DOMAIN}`);
});
