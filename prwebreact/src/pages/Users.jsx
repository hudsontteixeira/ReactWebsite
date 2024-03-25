import React,{useEffect,useState} from "react";
import {Navigate} from "react-router-dom"
import { postServiceData } from '../api/util';
import {UsersInList} from "../components/UsersInList";
import {UserContext} from '../context/userContext';
import NavBar from "../components/NavBar";
import { IoMdPersonAdd } from "react-icons/io";

function Users(props) {
    const [users, setUsers] = useState([]);
    const [wantToEdit, setWantToEdit] = useState(false); 
    const {userData,setUserData} = React.useContext(UserContext);  
    useEffect(()=>{
        postServiceData("users", {})
            .then((data)=>{setUsers(data)})
    },[])
    function handleAddUser(){
        setUserData({person_id:-1,person_firstname:"",person_lastname:"",person_birthdate:""});
        setWantToEdit(true);

    }
    const token = props.getToken();
    if(!token){
        return(<Navigate to="/" />)
    }
    if (wantToEdit) {
        return <Navigate push to="/user" />;
    }

    return (
        <>
        <NavBar />
        <div class="py-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" class="text-center">user #</th>
                                        <th scope="col" class="text-center">FirstName</th>
                                        <th scope="col" class="text-center">LastName</th>
                                        <th scope="col" class="text-center">Birthdate</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.sort((a, b) => a.person_id - b.person_id).map((item) => (
                                    <UsersInList item={item} setWantToEdit={setWantToEdit} key={item.personId} />
                                ))}
                                </tbody>
                                <tfoot>
                                    <tr id="addNew">
                                        <td scope="col" colspan="4"></td>
                                        <td class="text-center">
                                            <button class="btn"><IoMdPersonAdd color="#00888d" alt="add" onClick={handleAddUser} /></button>
                                        </td>
                                    </tr>
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
  
  export default Users;