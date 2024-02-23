import { useState } from "react";
import {Navigate} from "react-router-dom"
import { postServiceData } from '../api/util';
function Login(props) {
    const [canLogin, setCanLogin] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
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
            }
        })
    }
    if (canLogin) {
        props.setToken("loggedIn");
        return <Navigate push to="/users" />;
    }
    return (
        <>
            <div>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="">Library Login</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form id="c_form-h" action="login.do" method="POST" onSubmit={checkLogin}>
                                    <div className="form-group row">
                                        <label for="inputlogin" className="col-2 col-form-label">Login</label>
                                        <div className="col-10">
                                            <input onChange={(e)=>{setLogin(e.target.value)}} type="text" className="form-control" id="inputlogin" placeholder="login" name="login" required="required" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="inputpassword" className="col-2 col-form-label">Password</label>
                                        <div className="col-10">
                                            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="inputpassword" placeholder="Password" name="password" required="required" />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
    );
  }
  
  export default Login;