import React from 'react';
import {
  Switch, BrowserRouter as Router, Route,
} from 'react-router-dom';
import { ProvideAuth, PrivateRoute } from '../components/ProvideAuth';
import Login from './Login';
import ChatPage from './ChatPage';

const styles = {
  width: '100%',
  background: 'white',
};

const PageContainer: React.FC = () => (
  <ProvideAuth>
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/main">
          <ChatPage />
        </PrivateRoute>
      </Switch>
    </Router>
  </ProvideAuth>
);

export default PageContainer;
