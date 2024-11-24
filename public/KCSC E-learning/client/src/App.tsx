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
import QuestionPage from './pages/QuestionPage';
import NotePage from './pages/admin/NotePage';

function App() {
  return (
    <Routes>
          <Route path='/' element={<RootRoute />} />
          <Route path='/dashboard/note' element={<NotePage />} />
          <Route path='/dashboard/course' element={<CoursePage />} />
          <Route path='/dashboard/question' element={<QuestionPage />} />
          <Route path='/dashboard/subject' element={<SubjectPage />} />
          <Route path='/dashboard/alluser' element={<AllUserPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
