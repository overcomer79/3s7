const Room = require("../models/room");

exports.landing = (req, res, next) => {
  res.render("index", {
    data: { rooms: Room.getDeaultRoomList() }
  });
};

exports.room = (req, res, next) => {
  res.render("room", {});
};