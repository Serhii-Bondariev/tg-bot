import './App.css';
// import ReactDOM from 'react-dom/client'
import React, { useEffect } from 'react';
window.Telegram.WebApp.initData;

const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      Work
      <button onClick={onClose}>Close!</button>
    </div>
  );
}

export default App;
