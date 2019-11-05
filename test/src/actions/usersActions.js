import  {
    LOGIN_USER,
    REGISTER_USER
} from '../actions/types';

// login
export const loginUser = (email, password) => ({
    type: LOGIN_USER,
    email: email,
    password: password
});
//register
export const registerUser = (name, email, password, password2) => ({
    type: REGISTER_USER,
    name: name,
    email: email,
    password: password,
    password2: password2
});
