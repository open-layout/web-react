import LandingPage from './pages/LandingPage/index';
import NotFound from './pages/NotFound/index';
import AuthPage from './pages/AuthPage/index';
import DashboardPage from './pages/DashboardPage/index';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import Form from './components/ui/LayoutsForm';

import { Routes, Route, useNavigate } from 'react-router-dom';
import LayoutsPage from './pages/LayaoutsPage/index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/layouts" element={<LayoutsPage />} />
        <Route path="/layouts/*" element={<LayoutsPage />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth fallbackPath={'/auth'}>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
