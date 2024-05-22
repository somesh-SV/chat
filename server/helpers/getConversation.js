const Conversation = require("../Models/Conversation");

module.exports.getConversation = async (currentUserId) => {
  if (currentUserId) {
    const currentUserConversation = await Conversation.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .populate("messages")
      .populate("sender")
      .populate("receiver")
      .sort({ updatedAt: -1 });

    const conversation = currentUserConversation?.map((conv) => {
      const countUnseenMsg = conv.messages.reduce((prev, curr) => {
        const msgByUserId = curr.msgByUserId?.toString();
        if (msgByUserId !== currentUserId) {
          return prev + (curr.seen ? 0 : 1);
        } else {
          return prev;
        }
      }, 0);
      return {
        _id: conv?._id,
        sender: conv?.sender,
        receiver: conv?.receiver,
        unseenMsg: countUnseenMsg,
        lastMsg: conv.messages[conv?.messages?.length - 1],
      };
    });

    return conversation;
    //socket.emit("conversation", conversation);
  } else {
    return [];
  }
};
