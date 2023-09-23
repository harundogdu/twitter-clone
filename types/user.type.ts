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
  location: String;
  website: String;
  birthday: Date;

  posts: IPost[];
  likes: ILike[];
  comments: IComment[];
  notifications: INotification[];
}

export interface IPost {
  id: string;
  username: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  comment: IComment[];
  like: ILike[];
}

export interface IComment {
  id: string;
  username: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;

  like: ILike[];
}

export interface ILike {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;
}

export interface INotification {
  id: string;
  username: string;
  notificationBody: string;
  createdAt: Date;
  userId: string;
}
