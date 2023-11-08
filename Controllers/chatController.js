const asyncHandler = require("express-async-handler");
const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const ownId = req.params.id;

  if (!userId) {
    console.log("UserId params not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: ownId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email _id uid verified createdAt",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [ownId, userId],
    };

    try {
      const createdchat = await Chat.create(chatData);
      const fullChat = await Chat.findById(createdchat._id)
        .populate("users")
        .populate("latestMessage");

      res.send(fullChat);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      throw new Error("Invalid chat data");
    }
  }
});
const fetchChat = asyncHandler(async (req, res) => {
  const ownId = req.params.id;
  try {
    Chat.find({
      $or: [{ users: { $elemMatch: { $eq: ownId } } }],
    })
      .populate("users")
      .populate("groupAdmin")
      .populate("latestMessage")

      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email _id uid verified createdAt",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    throw new Error("Invalid chat data");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.chatName || !req.body.users) {
    console.log("ChatName or users not sent with request");
    return res.sendStatus(400);
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    console.log("Please add atleast 2 users");
    return res.status(400).send("Please add atleast 2 users");
  }

  users.unshift(req.user._id);

  var chatData = {
    chatName: req.body.chatName,
    isGroupChat: true,
    users: users,
    groupAdmin: req.user._id,
  };

  try {
    const createdchat = await Chat.create(chatData);
    const fullChat = await Chat.findById(createdchat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");

    res.send(fullChat);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    throw new Error("Invalid chat data");
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.sendStatus(404);
    throw new Error("Chat not found");
  } else {
    res.status(200).send(updatedChat);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.sendStatus(404);
    throw new Error("Chat not found");
  }
  res.status(200).send(updatedChat);
});

const addUser = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.sendStatus(404);
    throw new Error("Chat not found");
  }
  res.status(200).send(added);
});
const deleteChat = async (req, res) => {
  const { chatId } = req.body;
  const chat = await Chat.deleteOne({ _id: chatId });
  console.log(chat);
  res.send(chat);
};
module.exports = {
  accessChat,
  fetchChat,
  //   createGroupChat,
  //   renameGroup,
  //   removeFromGroup,
  //   addUser,
  deleteChat,
};
