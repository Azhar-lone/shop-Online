export interface blogType {
  owner: {
    firstName: String;
    lastName: String;
    userName: String;
    profilePic: string;
  };
  blog: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}
