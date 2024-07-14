export default interface reviewType {
  reviewBy: {
    firstName: string;
    lastName: string;
    userName: string;
    profilePic: string;
    _id: string;
  };
  createdAt: Date;
  updatedAt: Date;
  review: string;
  rating: number;
}
