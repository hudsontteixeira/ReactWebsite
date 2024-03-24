import { useState } from "react";
import {Navigate} from "react-router-dom"
import { postServiceData } from '../api/util';
function Login(props) {
    const [canLogin, setCanLogin] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [wrong, setWrong] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        setCanLogin(true)
        console.log(login,password)
    }
    props.removeToken();
    function checkLogin(e){
        e.preventDefault();
        const paramBody = {login:login, passwd:password}
        postServiceData("authenticate",paramBody).then((data)=>{
            if(data.ok === 1){
                setCanLogin(true)
            } else {
                setWrong(true)
            }
        })
    }
    if (canLogin) {
        props.setToken("loggedIn");
        return <Navigate push to="/users" />;
    }
    return (
        <>
            <div className="d-flex justify-content-center"  style={{backgroundColor: "#00888d", height: "100vh", width:"100%"}}>
                <div  className="flex-column" style={{marginTop:"10%", width:"30%", minWidth:200}}>
                    <div className="py-5 bg-white rounded">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <img src="./logo.png" class="img-fluid justify-content-center mb-4"  alt="logo"/>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-12 justify-content-center ">
                                    <form id="c_form-h" action="login.do" method="POST" onSubmit={checkLogin}>
                                        <div className="form-group row justify-content-center">
                                            <label for="inputlogin" className="col-3 col-form-label text-center" style={{minWidth:100}}>Login</label>
                                            <div className="col-md-7">
                                                <input onChange={(e)=>{setLogin(e.target.value)}} type="text" className="form-control" id="inputlogin" placeholder="login" name="login" required="required" />
                                            </div>
                                        </div>
                                        <div className="form-group row justify-content-center">
                                            <label for="inputpassword" className="col-3 col-form-label text-center" style={{minWidth:100}}>Password</label>
                                            <div className="col-md-7">
                                                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="inputpassword" placeholder="Password" name="password" required="required" />
                                            </div>
                                        </div>
                                        {wrong&&                                        
                                        <div className="row justify-content-center alert alert-danger">
                                            <p>Looks like your firstname or password is wrong</p>
                                        </div>}
                                        <div className="row justify-content-center">
                                        <button type="submit" className="btn btn-success col-md-9" style={{backgroundColor: "#00888d"}}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
    );
  }
  
  export default Login;