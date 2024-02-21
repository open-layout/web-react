import LandingPage from './pages/LandingPage/index';
import AuthPage from './pages/AuthPage/index';
import DashboardPage from './pages/DashboardPage/index'
import TemplatesPage from './pages/TemplatesPage/index'


import { Routes, Route } from 'react-router-dom';

function App() {
  return (
  
    <div className="App">

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
      </Routes>
    </div>
  );
}

export default App;
