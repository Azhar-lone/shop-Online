interface owner {
  firstName: string;
  lastName: string;
  userName: string;
  profilePic: string;
  _id: string;
}

export default interface reviewType {
  reviewBy: owner;
  createdAt: Date;
  updatedAt: Date;
  review: string;
  rating: number;
  _id: string;
}
export interface replyType {
  replyBy: owner;
  createdAt: Date;
  updatedAt: Date;
  reply: string;
  _id: string;
}
