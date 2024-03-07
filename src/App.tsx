import RequireAuth from '@auth-kit/react-router/RequireAuth';

import Form from './components/ui/LayoutsForm';

import LandingPage from './pages/landing/index';
import NotFound from './pages/NotFound/index';
import LayoutDetailsPage from './pages/layouts/detailsPage';
import AuthPage from './pages/auth/index';
import LayoutsPage from './pages/layouts/index';
import DashboardPage from './pages/dashboard/index';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/layouts" element={<LayoutsPage />} />
        <Route path="/layouts/:name" element={<LayoutDetailsPage />} />
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
