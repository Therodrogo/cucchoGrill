import React from 'react';
import NavbarSuperior from './NavbarSuperior';
import AdminCard from './components/AdminCard';
import NavbarInferior from './NavbarInferior';

function App() {
  return (
    <div className="App">
      <NavbarSuperior />
      <AdminCard />
      <NavbarInferior />
    </div>
  );
}

export default App;