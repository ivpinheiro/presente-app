import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onGetUser?: () => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "jwt-token";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  const loadToken = async () => {
    const activeAuth = process.env.EXPO_PUBLIC_AUTH === "true";
    if (activeAuth) {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token: null, authenticated: true });
      }
    } else {
      setAuthState({ token: "jwt-token", authenticated: true });
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/user`, { email, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, { email, password });
      setAuthState({ token: result.data.access_token, authenticated: true });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.access_token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token);
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data };
    }
  };

  const loadUser = async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) {
        throw new Error("Token not found");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const result = await axios.get(`${API_URL}/user/me`);
      return result.data;
    } catch (error) {
      console.error("Error loading user:", error);
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };
  const value = {
    onRegister: register,
    onLogin: login,
    onGetUser: loadUser,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
