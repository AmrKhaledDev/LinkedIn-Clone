export interface StatesRegister {
  name: string;
  email: string;
  password: string;
  errors: {
    name?: string;
    email?: string;
    password?: string;
  };
  loading: boolean;
}
export interface StatesLogin {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  loading: boolean;
}

export interface FormEditProfileErrors {
  name?: string;
  headline?: string;
  school?: string;
  country?: string;
  city?: string;
}
