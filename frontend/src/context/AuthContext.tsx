import api from "api/axios";
import React, {
  type ReactNode,
  createContext,
  type ReactElement,
  useMemo,
  useEffect,
  useState
} from "react";
import { type LoginRequest } from "types/requests";

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  userId: string | undefined;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  userId: undefined,
  isAuthenticated: false,
  login: async (_payload: LoginRequest) => {},
  logout: async () => {}
});

export const AuthProvider = ({ children }: Props): ReactElement => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      if (userId === undefined) {
        try {
          const { userId } = await api.auth.checkAuth();
          setUserId(userId);
        } catch (error) {
          setUserId(undefined);
        }
      }
    };

    void checkAuth();
  }, []);

  const login = async (payload: LoginRequest): Promise<void> => {
    const { id } = await api.auth.login(payload);
    setUserId(id);
  };

  const logout = async (): Promise<void> => {
    await api.auth.logout();
    setUserId(undefined);
  };

  const contextValue = useMemo(
    () => ({ userId, login, logout, isAuthenticated: userId !== undefined }),
    [userId]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => React.useContext(AuthContext);
