import React,{ useState,useEffect } from "react";
import {UserContext} from '../context/userContext';
import { postServiceData } from "../api/util";
import {Navigate} from "react-router-dom";
function User(props) {
    const {userData} = React.useContext(UserContext);
    const birthDateTrype = new Date(userData.person_birthdate);
    
    const [dataSaved,setDataSaved] = useState(false);  
    const [reload,setReload] = useState(false);  
    const [birthdate,setBirthdate] = useState(`${birthDateTrype.getUTCFullYear()}-${(birthDateTrype.getUTCMonth() + 1)}-${birthDateTrype.getUTCDate()+1}`);
    const [firstName,setFirstName] = useState(userData.person_firstname);
    const [lastName,setLastName] = useState(userData.person_lastname);
    const [borrows,setBorrows] = useState(null);

    const [pass,setPass] = useState("");

    useEffect(()=>{
        postServiceData("borrow", {id:userData.person_id})
            .then((data)=>{setBorrows(data)})
    },[reload])

    const handleSubimit = (e) => {
        e.preventDefault();
        userData.person_id != -1 ? 
            postServiceData("updateUser", {
                person_firstname: firstName,
                person_lastname: lastName,
                person_birthdate: `${birthdate}T23:00:00.000`,
                id: userData.person_id
            })
            .then((data)=>{console.log(data);setDataSaved(data);})
        : postServiceData("createUser", {
            person_firstname: firstName,
            person_lastname: lastName,
            person_birthdate: `${birthdate}T23:00:00.000`,
            password: pass,
        })
        .then((data)=>{console.log("createdUser",data);setDataSaved(data);})

    }
    const token = props.getToken();
    if(!token){
        return(<Navigate to="/" />)
    }
    if(dataSaved.ok === 1){return <Navigate to="/users" />;}

    return (
        <>
        <div className="py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 >Create / Edit User page</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <form onSubmit={handleSubimit} >
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
                                            value={birthdate}
                                            placeholder={`${birthDateTrype.getUTCDate()+1}/${(birthDateTrype.getUTCMonth() + 1)}/${birthDateTrype.getUTCFullYear()}`} /></td>
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
                                        {borrows && borrows.map((item, i) => {
                                           let bdate = item.borrow_date.split("T")[0];
                                           let breturn = item.borrow_return.split("T")[0];

                                            return(
                                                <tr key={i}>
                                                <td scope="col" className="text-center">
                                               <p> {bdate.split("-")[2]}/{bdate.split("-")[1]}/{bdate.split("-")[0]}</p>
                                                </td>
                                                <td>{item.book_title}</td>
                                                <td className="text-center">
                                                            {item.borrow_return == null ? <button className="btn" name="return" 
                                                                    onClick={()=>{ 
                                                                        let currentDate = new Date();
                                                                        let postdata= `${currentDate.getUTCFullYear()}-${(currentDate.getUTCMonth())}-${currentDate.getUTCDate()+1}` 
                                                                        console.log("postdata",postdata)
                                                                        postServiceData("updateBorrow", {id:item.borrow_id,return_date:postdata}).then((e)=>{setReload(((value)=>!value))})}}>
                                                                <img src="img/return.png" alt="return" className="icon" />
                                                            </button> : <p>{breturn.split("-")[2]}/{breturn.split("-")[1]}/{breturn.split("-")[0]}</p>}
                                                </td>
                                            </tr>
                                            )
                                        })}
                                        </tbody>
                                        <tfoot>
{/*                                         <form  method="POST">
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
                                        </form> */}
                                        </tfoot>
                                    </table>
                                </div>
                        </div>
                    </div>
                </div>

        </div>
      </>
    );
  }
  
  export default User;