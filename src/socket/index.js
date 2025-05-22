const { Server } = require("socket.io");
const { createServer } = require("http");
const socketConfig = require("../configs/socket.config");
const socketMiddleware = require("../middlewares/socket.middleware");
const { responseStatusSocket } = require("../global/response");
const RequestService = require("../services/request.service");
const notificationService = require("../services/notification.service");
const { PORT } = require("../global/secretKey");
require("dotenv").config();

const initSocket = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, socketConfig);

  io.use(socketMiddleware.authSocket);

  io.on("connection", (socket) => {
    let userId = socket.user.id;
    console.log("User connected:", {
      socketId: socket.id,
      userId: userId,
    });

    socket.join(userId);

    socket.on("disconnect", () => {
      console.log("User disconnected:", {
        socketId: socket.id,
        userId: userId,
      });
    });

    socket.on("sendRequest", async (data) => {
      try {
        let getRequestExist = await RequestService.getRequestExist(
          data.doctorId,
          data.patientId
        );

        if (getRequestExist) {
          responseStatusSocket(
            io,
            "onRequest",
            "failed",
            "You have submitted a request for this patient, please contact them."
          );
        }
        let createRequest = await RequestService.createRequest(
          data.doctorId,
          data.patientId
        );

        if (createRequest) {
          let createNotification = await notificationService.createNotification(
            data.patientId,
            "You have a new request from a doctor"
          );

          if (createNotification) {
            io.to(data.patientId).emit("onRequest", {
              status: "success",
              data: "You have a new request from a doctor",
            });
          } else {
            io.to(data.patientId).emit("onRequest", {
              status: "failed",
              data: "Failed to create request2",
            });
          }
        } else {
          io.to(data.patientId).emit("onRequest", {
            status: "failed",
            data: "Failed to create request",
          });
        }
      } catch (e) {
        io.to(data.patientId).emit("onRequest", {
          status: "failed",
          data: e.message || "An error occurred",
        });
      }
    });

    // accept request for doctor
    socket.on("acceptRequest", async (data) => {
      let updateRequest = await RequestService.updateRequest(
        data.requestId,
        true
      );
      if (updateRequest) {
        let createNotification = await notificationService.createNotification(
          data.doctorId,
          `Approved you can view medical records`
        );
        if (createNotification) {
          io.to(data.doctorId).emit("onRequest", {
            status: "success",
            data: `Approved you can view medical records`,
          });
        }
      } else {
        io.to(data.doctorId).emit("onRequest", {
          status: "failed",
          data: "Failed to accept request",
        });
      }
    });

    // refuse request for doctor
    socket.on("refuseRequest", async (data) => {
      let updateRequest = await RequestService.updateRequest(
        data.requestId,
        false
      );
      if (updateRequest) {
        let createNotification = await notificationService.createNotification(
          userId,
          `Refused`
        );
        if (createNotification) {
          io.to(data.doctorId).emit("onRequest", {
            status: "success",
            data: "Refused",
          });
        }
      } else {
        io.to(data.doctorId).emit("onRequest", {
          status: "failed",
          data: "Failed to refuse request",
        });
      }
    });

    // this is for notification
    socket.on("notification", async (data) => {
      let myNotification = await notificationService.getNotification(userId);
      socket.join(data.userId);
      if (myNotification) {
        responseStatusSocket(io, "onNotification", "success", myNotification);
      } else {
        responseStatusSocket(
          io,
          "onNotification",
          "failed",
          "No notification found"
        );
      }
    });
  });

  const PORT = PORT || 3000;
  httpServer.listen(PORT);
  console.log(`Socket server listening on port ${PORT}`);
};

module.exports = initSocket;
