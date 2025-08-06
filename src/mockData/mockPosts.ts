import { IPost } from "../interfaces";

export const mockPosts: IPost[] = [
  {
    id: 1,
    content: "Just finished reading a great book on React Native!,",
    author: {
      id: 101,
      userName: "Alice Johnson",
      firstName: "Alice",
      lastName: "Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    comments: [
      {
        id: 1001,
        content: "Which book was it?",
        author: {
          id: 102,
          userName: "Bob Smith",
          firstName: "Alice",
          lastName: "Johnson",
          avatar: "https://i.pravatar.cc/150?img=2",
        },
      },
      {
        id: 1002,
        content: "I love React Native too!",
        author: {
          id: 103,
          userName: "Charlie Daniels",
          firstName: "Charlie",
          lastName: "Daniels",
          avatar: "https://i.pravatar.cc/150?img=3",
        },
      },
    ],
  },
  {
    id: 2,
    content: "Started learning TypeScript today 🚀",
    author: {
      id: 104,
      userName: "Diana Prince",
      firstName: "Charlie",
      lastName: "Daniels",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    comments: [
      {
        id: 1003,
        content: "You're going to love it!",
        author: {
          id: 101,
          userName: "Alice Johnson",
          firstName: "Charlie",
          lastName: "Daniels",
          avatar: "https://i.pravatar.cc/150?img=1",
        },
      },
    ],
  },
  {
    id: 3,
    content: "Looking for suggestions for a good UI library.",
    author: {
      id: 105,
      userName: "Ethan Hunt",
      firstName: "Charlie",
      lastName: "Daniels",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    comments: [],
  },
];
