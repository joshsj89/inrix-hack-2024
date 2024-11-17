import './App.css';
import './Components/NavBar'
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
