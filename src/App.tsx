import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Layout from './components/Layout';
import PrivateRoutes from './components/PrivateRoutes';
import './App.css';

const Login = lazy(() => import('./pages/Login'));
const Registration = lazy(() => import('./pages/Registration'));
const NoPage = lazy(() => import('./pages/NoPage'));
const Categories = lazy(() => import('./pages/Categories'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Task = lazy(() => import('./pages/Task'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Downloading...</>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<PrivateRoutes />}>
              <Route index element={<Categories />} />
              <Route path="categories/:categoryId/tasks" element={<Outlet />}>
                <Route index element={<Tasks />} />
                <Route path=":id" element={<Task task={undefined} />} />
              </Route>
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
