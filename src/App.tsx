import LandingPage from './pages/LandingPage/index';
import AuthPage from './pages/AuthPage/index';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}></div>
    </div>
  );
}

export default App;
