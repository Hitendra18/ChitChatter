# ChitChatter - Realtime Chat App

[Visit Live Website](https://chit-chatter.vercel.app/)

Chit-Chatter is a real-time chat application that allows users to communicate seamlessly with each other through text messages and video calls. It provides a platform for individual and group conversations, ensuring a smooth and engaging user experience.

## Features

- **Realtime Messaging**: Send and receive text messages in real-time, creating a dynamic conversation experience.
- **Video Calling**: Initiate video calls with other users for face-to-face communication.
- **User Authentication**: Create individual accounts, allowing users to personalize their experience and maintain privacy.
- **Dark Mode Support**: Enjoy a visually pleasing experience with the option to switch between light and dark themes.
- **Search Functionality**: Easily find other users to chat with by searching their usernames.
- **Group Chat**: Create and participate in group conversations, fostering collaboration and community.
- **Profile Management**: Upload profile pictures and update personal information such as name, email, and password.
- **Responsive Design**: Access Chit-Chatter from any device, with responsive design ensuring usability across various screen sizes.

## Technologies Used

- **Frontend**: React.js, agora-rtc-react, socket.io-client, tailwindCSS, react-router-dom, Context API, react-redux, @tanstack/react-query, axios
- **Backend**: Express.js, socket.io, MongoDB, mongoose, multer, jsonwebtoken (JWT), bcryptjs

## Folder Structure

```plaintext
.
├── backend-chat-app/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── chatControllers.js
│ │ ├── messageControllers.js
│ │ └── userControllers.js
│ ├── middlewares/
│ │ ├── authGuard.js
│ │ ├── errorHandlers.js
│ │ └── uploadPicture.js
│ ├── models/
│ │ ├── Chat.js
│ │ ├── Message.js
│ │ └── User.js
│ ├── routes/
│ │ ├── chatRoutes.js
│ │ ├── messageRoutes.js
│ │ └── userRoutes.js
│ ├── uploads
│ ├── utils/
│ │ └── fileRemover.js
│ ├── server.js
│ ├── socketLogic.js
│ ├── .env
│ ├── .gitignore
│ └── package.json
└── frontend-chat-app/
├── public
├── src/
│ ├── assets
│ ├── components/
│ │ ├── chatInfo/
│ │ │ ├── ChatInfo.jsx
│ │ │ ├── GroupChatInfo.jsx
│ │ │ └── RegularChatInfo.jsx
│ │ ├── chatSection/
│ │ │ ├── ChatSection.jsx
│ │ │ ├── ChatSectionTop.jsx
│ │ │ ├── Message.jsx
│ │ │ ├── SendMessage.jsx
│ │ │ └── ShowMessages.jsx
│ │ ├── createGroup/
│ │ │ ├── CreateGroup.jsx
│ │ │ ├── CreateGroupUserTile.jsx
│ │ │ └── SelectedUser.jsx
│ │ ├── sidebar/
│ │ │ ├── ChatsSidebar.jsx
│ │ │ ├── SidebarChatTile.jsx
│ │ │ ├── SidebarTop.jsx
│ │ │ └── SidebarUserTile.jsx
│ │ ├── GeneralTopBar.jsx
│ │ ├── HoverDropdown.jsx
│ │ └── IncomingCallToast.jsx
│ ├── constants/
│ │ ├── images.js
│ │ └── index.js
│ ├── contexts/
│ │ ├── ChatProvider.jsx
│ │ ├── useChatState.js
│ │ ├── CreateGroupProvider.jsx
│ │ ├── useCreateGroupState.js
│ │ ├── MessagesDataProvider.jsx
│ │ ├── userMessagesDataState.js
│ │ ├── SocketProvider.jsx
│ │ └── useSocketState.js
│ ├── hooks/
│ │ └── chatTileHooks.js
│ ├── pages/
│ │ ├── HomePage.jsx
│ │ ├── MeetPage.jsx
│ │ ├── ProfilePage.jsx
│ │ ├── SignInPage.jsx
│ │ └── SignUpPage.jsx
│ ├── services/
│ │ ├── api
│ │ ├── mutations
│ │ └── queries
│ ├── store/
│ │ ├── index.js
│ │ └── userSlice.js
│ ├── utils/
│ │ └── getReceivers.js
│ ├── App.js
│ ├── main.jsx
│ ├── App.css
│ └── index.css
├── .env
├── index.html
├── .gitignore
├── tailwind.config.js
└── vercel.json
```

## Thank You❤️
