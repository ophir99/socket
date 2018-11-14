const chatRoom = require("./../models/chatroom_model");
const user = require("./../models/user_models");
exports.createChatRoom = async (req, res) => {
  console.log(req.body);
  let roomid;
  let superResult;
  try {
    await chatRoom
      .find({ includes: { $all: [req.body.user1, req.body.user2] } })
      .then(result => {
        if (result.length > 0) {
          throw new Error("You are already joined");
        }
        console.log("CR", result);
        const cRoom = new chatRoom({
          includes: [req.body.user1, req.body.user2]
        });
        return cRoom.save();
      })
      .then(result => {
        console.log("RR", result);
        roomid = result._id;
        superResult = result;

        return user.findOneAndUpdate(
          { _id: req.body.user1 },
          {
            $push: {
              rooms: {
                id: roomid,
                with: req.body.user2,
                name: req.body.user2Name
              }
            }
          }
        );
      })
      .then(result => {
        console.log("One", result);
        return user.findOneAndUpdate(
          { _id: req.body.user2 },
          {
            $push: {
              rooms: {
                id: roomid,
                with: req.body.user1,
                name: req.body.user1Name
              }
            }
          }
        );
      })
      .then(result => {
        console.log("Two", result);
        res.send({ response: superResult });
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    res.send({ error: error });
  }
};

exports.getAllChatRooms = async (req, res) => {
  const userId = req.query.user;
  try {
    await chatRoom
      .find({ includes: userId })
      .then(result => {
        res.send({ response: result });
      })
      .catch(err => {
        throw err;
      });
  } catch (error) {
    res.send({ error: error });
  }
};

exports.goToChatRoom = async (req, res) => {
  const userid = req.params.id;
  const by = req.query.user;
  console.log("userId", userid);
  console.log("By", by);
  try {
    await chatRoom
      .find({ includes: { $all: [userid, by] } })
      .then(result => {
        console.log("Rooms", result);
        res.send({ response: result });
      })
      .catch(err => {
        throw err;
      });
  } catch (error) {
    res.send({ error: error });
  }
};
