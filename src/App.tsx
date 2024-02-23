import LandingPage from './pages/LandingPage/index';
import AuthPage from './pages/AuthPage/index';
import DashboardPage from './pages/DashboardPage/index';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import Form from './components/ui/LayoutsForm';

import { Routes, Route } from 'react-router-dom';
import LayaoutsPage from './pages/LayaoutsPage/index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/layaouts" element={<LayaoutsPage />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth fallbackPath={'/auth'}>
              <DashboardPage />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
