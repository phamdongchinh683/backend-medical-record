const { _tokenSecret } = require("../global/secretKey");
const { verifyToken } = require("../utils/verifyToken");

class SocketMiddleware {
  async authSocket(socket, next) {
    let token =
      socket.handshake.auth?.token || socket.handshake.headers["authorization"];

    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    if (!token) {
      return next(new Error("No token provided"));
    }

    try {
      const decoded = await verifyToken(token, _tokenSecret);
      socket.user = decoded.payload;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  }
}

module.exports = new SocketMiddleware();
