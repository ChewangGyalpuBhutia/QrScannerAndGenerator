import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scanner from './components/Scanner'
import Login from './components/Login'
import Signup from './components/Signup';

function App() {
  return (
    <div className='container mt-3'>
      <Scanner></Scanner>
    </div>
  );
}

export default App;
