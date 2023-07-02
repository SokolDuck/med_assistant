import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";


const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback) {
      fakeAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signout(callback) {
      fakeAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };
  
  export { fakeAuthProvider };



let AuthContext = React.createContext();


export function AuthProvider({ children }) {
    let [user, setUser] = React.useState(null);

    let signin = (newUser, callback) => {
        return fakeAuthProvider.signin(() => {
        setUser(newUser);
        callback();
        });
    };

    let signout = (callback) => {
        return fakeAuthProvider.signout(() => {
        setUser(null);
        callback();
        });
    };

    let value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
  
export function useAuth() {
    return React.useContext(AuthContext);
}


export function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
  
    return children;
}
  