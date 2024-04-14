export const getReceivers = (chatData, userId) => {
  const receivers = [];

  // for loop
  for (let i = 0; i < chatData?.users.length; i++) {
    if (chatData?.users[i]._id !== userId) {
      receivers.push(chatData?.users[i]._id);
    }
  }
  return receivers;
};
