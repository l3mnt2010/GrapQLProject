import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import RootRoute from './pages/rootRoute';
import CoursePage from './pages/CoursePage';
import SubjectPage from './pages/SubjectPage';
import AllUserPage from './pages/admin/AllUserPage';

function App() {
  return (
        <Routes>
          <Route path='/' element={<RootRoute />} />
          <Route path='/dashboard/course' element={<CoursePage />} >
          </Route>
          <Route path='/dashboard/subject' element={<SubjectPage />} />
          <Route path='/admin/allusers' element={<AllUserPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
  );
}

export default App;
