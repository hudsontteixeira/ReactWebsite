import React,{ useState } from "react";
import {UserContext} from '../context/userContext';
import { postServiceData } from "../api/util";
import {Navigate} from "react-router-dom";
function User(props) {
    const {userData} = React.useContext(UserContext);
    const [dataSaved,setDataSaved] = useState(false);  
    const [birthdate,setBirthdate] = useState(userData.person_birthdate);
    const [firstName,setFirstName] = useState(userData.person_firstname);
    const [lastName,setLastName] = useState(userData.person_lastname);
    const [pass,setPass] = useState("");

    const birthDateTrype = new Date(userData.person_birthdate);
    const handleSubimit = (e) => {
        e.preventDefault();
        userData.person_id != -1 ? 
            postServiceData("updateUser", {
                person_firstname: firstName,
                person_lastname: lastName,
                person_birthdate: `${birthdate}T00:00:00.000Z`,
                id: userData.person_id
            })
            .then((data)=>{console.log(data);setDataSaved(data);})
        : postServiceData("createUser", {
            person_firstname: firstName,
            person_lastname: lastName,
            person_birthdate: `${birthdate}T00:00:00.000Z`,
            password: pass,
        })
        .then((data)=>{console.log("createdUser",data);setDataSaved(data);})

    }
    if(dataSaved.ok === 1){return <Navigate to="/users" />;}
    return (
        <>
        <div className="py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 >Create / Edit User page</h2>
                        {JSON.stringify(userData.person_birthdate)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <form onSubmit={handleSubimit} method="POST">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th scope="col">user #</th>
                                            <td>
                                                    <p name="id">{userData.person_id != -1 && userData.person_id}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col">FirstName</th>
                                            <td><input type="text" className="form-control" name="FirstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/></td>
                                        </tr>
                                        <tr>
                                            <th scope="col">LastName</th>
                                            <td><input type="text" className="form-control" name="LastName" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} /></td>
                                        </tr>
                                        <tr>
                                            <th scope="col">Birthdate</th>
                                            <td><input type="text" 
                                            className="form-control" 
                                            name="Birthdate" 
                                            onFocus={(e)=>{e.target.type='date'}}
                                            onBlur={(e)=>{e.target.type='text'}}
                                            onChange={(e)=>{setBirthdate(e.target.value)}}
                                            placeholder={`${birthDateTrype.getDay()}/${birthDateTrype.getMonth()}/${birthDateTrype.getFullYear()}`} /></td>
                                        </tr>
                                       {userData.person_id === -1 && 
                                        <tr>
                                            <th scope="col">Password</th>
                                            <td><input type="password" 
                                            className="form-control" 
                                            name="Password" 
                                            value={pass} 
                                            onChange={(e)=>{setPass(e.target.value)}} /></td>
                                        </tr>}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td scope="col" colspan="2" className="text-center"><button type="submit" className="btn btn-block btn-primary">Save</button></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <form action="addBook" method="POST">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Return</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                <tr>
                                                    <td scope="col" className="text-center">
                                                        {"item.borrowDate"}
                                                    </td>
                                                    <td>{"item.bookId.bookTitle"}</td>
                                                    <td className="text-center">
                                                                <button className="btn" name="return" 
                                                                        onclick="returnBorrow(this, ${ item.borrowId }); return false;">
                                                                    <img src="img/return.png" alt="return" className="icon" />
                                                                </button>
                                                    </td>
                                                </tr>
                                        </tbody>
                                        <tfoot>
                                        <form action="addBorrow.do" method="POST">
                                            <tr>
                                                <td colspan="2">
                                                    <input type="hidden" name="userID" value="${ user.personId }" />
                                                    <select name="bookID" className="form-control form-select form-select-lg mb-3">
                                                        <option value="-1" selected="selected">-</option>
                                                            <option value="${ book.bookId }">{"book.bookTitle"}</option>
                                                    </select>
                                                </td>
                                                <td  className="text-center">
                                                    <button className="btn"><img src="img/plus.png" alt="add" className="icon" /></button>
                                                </td>
                                            </tr>
                                        </form>
                                        </tfoot>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        </div>
      </>
    );
  }
  
  export default User;