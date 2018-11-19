const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const user_routes = require("./routes/user_routes");
const message_routes = require("./routes/message_routes");
const chatroom_routes = require("./routes/chatroom_routes");
mongoose
  .connect(
    " mongodb://127.0.0.1:27017/dbdev",
    {
      useNewUrlParser: true
    }
  )
  .then(() => {})
  .catch(err => console.log(" error", err));
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", user_routes);
app.use("/message", message_routes);
app.use("/chatroom", chatroom_routes);

const server = app.listen(4500, () => {});

const io = require("./socket").setIO(server);
io.on("connection", socket => {
  socket.on("createRoom", room => {
    console.log("Room", room);
    socket.join(room);
  });
});
