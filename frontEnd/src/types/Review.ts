export default interface reviewType {
  owner: {
    firstName: String;
    lastName: String;
    userName: String;
    profilePic: string;
  };
  createdAt: Date;
  updatedAt: Date;
  review: string;
  rating?: number;
}
