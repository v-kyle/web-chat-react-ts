import React from 'react';
import './App.css';
import Header from './Header';
import PageContainer from '../pages/PageContainer';

const App: React.FC = () => (
  <div id="app">
    <Header />
    <PageContainer />
    {/* <Footer /> */}
  </div>
);

export default App;
