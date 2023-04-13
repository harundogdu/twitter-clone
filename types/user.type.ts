export interface IUser {
  id: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  emailVerified: Date;
  image: string;
  coverImage: string;
  profileImage: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
  followingIds: string[];
  hasNotification: boolean;
  posts: IPost[];

  comments: IComment[];
  notifications: INotification[];
}

export interface IPost {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  comment: IComment[];
}

export interface IComment {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;
}

export interface INotification {
  id: string;
  notificationBody: string;
  createdAt: Date;
  userId: string;
}
