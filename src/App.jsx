import { Outlet } from 'react-router-dom';
// import './App.css'; // No longer needed as Tailwind handles global styles

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;