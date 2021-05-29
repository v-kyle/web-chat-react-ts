import React, {
  createContext, useState, useContext, ReactNode, useEffect,
} from 'react';
import { Route, Redirect } from 'react-router-dom';
import fakeStore from '../store/FakeStore';

function useProvideAuth() {
  const [user, setUser] = useState<string | null>(null);

  const signIn = () => {
    fakeStore.signIn('Leonid');
    setUser('Leonid');
  };

  const signOut = () => {
    fakeStore.signOut();
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
  };
}

const authContext = createContext({
  user: null as string | null,
  signIn: () => {
    console.log('singIn');
  },
  signOut: () => {
    console.log('singOut');
  },
});

const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

function useAuth() {
  return useContext(authContext);
}

const PrivateRoute: React.FC<{children: ReactNode; path: string}> = ({ children, path }) => {
  const auth = useAuth();
  useEffect(() => {
    console.log(auth.user);
    auth.signIn();
    console.log(auth.user);
  }, []);
  return (
    <Route
      path={path}
      render={({ location }) => (auth.user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export {
  ProvideAuth,
  PrivateRoute,
};
