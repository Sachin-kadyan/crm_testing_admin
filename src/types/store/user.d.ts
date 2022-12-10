export interface iUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  uid: string;
  role: REPRESENTATIVE_ROLES;
  image: string;
  access: string;
  refresh: string;
}

export interface iUserStore {
  user: null | iUser;
  setUser: (user: iUser | null) => void;
}
