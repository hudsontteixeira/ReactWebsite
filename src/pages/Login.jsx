import { useState } from "react";
import {Navigate} from "react-router-dom"
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
                                <form id="c_form-h" action="login.do" method="POST" onSubmit={handleSubmit}>
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