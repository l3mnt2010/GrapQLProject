import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import {Provider} from 'react-redux'
import './index'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import store from './redux/store'
import RootRoute from './pages/rootRoute'

function App() {
  return (
  <Provider store={store}>
    <Routes>
        <Route path='/' element={<RootRoute />} />
        <Route path='/home' element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
   </Provider>
  )
}

export default App
