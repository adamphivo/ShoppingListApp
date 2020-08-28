import React from 'react';
import List from './Components/List';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <div className="w-full p-2 bg-blue-400 text-white">
        Shopping List App 
        <span className="ml-1" role="img" aria-label="shopping cart">🛒</span>
      </div>
      <List></List>
    </div>
  );
}

export default App;
