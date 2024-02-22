import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Users from './pages/Users'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
      <Router>
        <Routes>
          <Route path='/' element={<Login removeToken={removeToken} setToken={setToken} />}/>
          <Route path='/users' element={<Users getToken={getToken} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
