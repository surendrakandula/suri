import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ResponsiveDrawer from './Navigation/Sidebar/sidebar';
// import BasicTable from './Navigation/Body/Table';
import CompanyCount from './home';
function App() {
  return (
    <Router>
      <div>
      <ResponsiveDrawer />
        
      </div>
    </Router>
  );
}

export default App;
