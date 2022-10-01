import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../features/layout/Layout';

import HomePage from '../pages/HomePage';
import NewProjectPage from '../pages/NewProjectPage';
import EditProjectPage from '../pages/EditProjectPage';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-project" element={<NewProjectPage />} />
          <Route path="/edit-project/:id" element={<EditProjectPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
