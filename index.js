const express = require("express");
const app = express();
const router = require("./src/routers");
const cors = require("cors");
const { PORT } = require("./src/global/secretKey");
const corsOptions = require("./src/configs/cors.config");
const connectDB = require("./src/configs/mongo.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
router(app);

app.listen(3000, () => {
  console.log(
    "\x1b[32m%s\x1b[0m",
    `Server running at http://localhost:${PORT || 3030}`
  );
});

connectDB();
