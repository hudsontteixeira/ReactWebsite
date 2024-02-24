import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Users from './pages/Users';
import User from './pages/User';
import Books from './pages/Books';
import Book from './pages/Book';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {UserProvider} from './context/userContext'
import { BookProvider } from './context/bookContext';
function setToken (userToken){
  sessionStorage.setItem('token',JSON.stringify(userToken))
}
function getToken (){
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return (userToken != null)
}

function removeToken(){
  sessionStorage.removeItem('token')
}
function App() {
  return (
    <div>
      <UserProvider>
        <BookProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Login removeToken={removeToken} setToken={setToken} />}/>
              <Route path='/users' element={<Users getToken={getToken} />}/>
              <Route path='/user' element={<User getToken={getToken} />}/>
              <Route path='/books' element={<Books getToken={getToken} />}/>
              <Route path='/book' element={<Book getToken={getToken} />}/>
            </Routes>
          </Router>
        </BookProvider>
      </UserProvider>
    </div>
  );
}

export default App;
