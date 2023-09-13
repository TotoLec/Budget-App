import './App.css';
import '@fontsource/inter';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/home';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

function App() {

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      />
      
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
