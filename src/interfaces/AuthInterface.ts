export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  followers?: string[];
  following?: string[];
}

export interface Auth {
  formData: User;
  navigate: any;
  toast?: any;
}


export interface AuthUser {
  email: string;
  password: string;
  name?: string;
}

