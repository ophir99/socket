let io;
module.exports = {
  setIO: function(server) {
    io = require("socket.io")(server);
    return io;
  },
  getIO: function() {
    if (!io) {
      throw new Error("IO is not created");
    }
    return io;
  }
};
