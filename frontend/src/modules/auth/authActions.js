import { toast } from "react-toastify";
import { loginApi, getMeApi, logoutApi } from "./authApi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  clearAuthError,
} from "./authSlice";

// 📌 Login
export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart());

  try {
    const data = await loginApi(credentials);

    dispatch(loginSuccess(data.user));
    toast.success("Inicio de sesión exitoso.");

    return { ok: true, data: data.user };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Error al iniciar sesión";

    dispatch(loginFailure(message));
    toast.error(message);

    return { ok: false, message };
  }
};

// 📌 Verificar sesión actual usando cookie
export const checkAuth = () => async (dispatch) => {
  dispatch(checkAuthStart());

  try {
    const user = await getMeApi();
    dispatch(checkAuthSuccess(user));

    return { ok: true, data: user };
  } catch (_error) {
    dispatch(checkAuthFailure(null));
    return { ok: false };
  }
};

// 📌 Logout
export const logout = () => async (dispatch) => {
  dispatch(logoutStart());

  try {
    await logoutApi();
    dispatch(logoutSuccess());
    toast.success("Sesión cerrada correctamente.");

    return { ok: true };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Error al cerrar sesión";

    dispatch(logoutFailure(message));
    toast.error(message);

    return { ok: false, message };
  }
};

// 📌 Limpiar error
export const resetAuthError = () => (dispatch) => {
  dispatch(clearAuthError());
};