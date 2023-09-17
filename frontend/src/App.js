import './App.css';
import '@fontsource/inter';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/home';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage/>} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
