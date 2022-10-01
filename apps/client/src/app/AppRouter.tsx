import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../features/layout/Layout';

import HomePage from '../pages/HomePage';
import NewProjectPage from '../pages/NewProjectPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/new-project" element={<NewProjectPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
