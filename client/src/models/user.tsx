export interface LoginInputs {
  username: string;
  password: string;
}

export interface RegisterInputs {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  msg: string;
  username: string;
  image: string;
}

export interface UserState {
  userData: {
    username: string;
    image: string;
  };
}

export interface ChangePasswordFormInput {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export interface ChanggePasswordInput {
  oldPassword: string;
  newPassword: string;
}
