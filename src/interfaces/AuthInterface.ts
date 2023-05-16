export interface User {
  message: string;
  token: string;
  name: string;
  email: string;
  password: string;
  _id?: string;
  avatar?: string;
  followers?: string[];
  following?: string[];
}

export interface AuthUser {
  email: string;
  password: string;
  name?: string;
}

export interface Auth {
  formData: AuthUser;
  navigate: any;
  toast?: any;
}
