import api from "./api";
import TokenService from "./token.service";
const register = (login, password) => {
    return api.post("/auth/signup", {
        login,
        password
    });
};
const login = (login, password) => {
    return api
        .post("/auth/signin", {
            login,
            password
        })
        .then((response) => {
            if (response.data.token) {
                TokenService.setUser(response.data);
            }
            return response.data;
        });
};
const logout = () => {
    TokenService.removeUser();
};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};
export default AuthService;