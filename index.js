const express = require("express");
const app = express();
const router = require("./src/routers");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { PORT } = require("./src/global/secretKey");
const corsOptions = require("./src/configs/cors.config");
const connectDB = require("./src/configs/mongo.config");
const initSocket = require("./src/socket");

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
router(app);
initSocket(app);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT || 3030}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
