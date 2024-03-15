import React, {useState} from 'react';
import {UserContext} from '../context/userContext';
import {postServiceData} from "../api/util";
import {Navigate} from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
export function UsersInList(props) {
    const {userData,setUserData} = React.useContext(UserContext);  
    const [reload, setReload] = useState(false)
    const birthdate = new Date(props.item.person_birthdate);
    if (reload) {
        return <Navigate push to="/users" />;
    }
    return (
        <>
            <tr>
                <td className="text-center" scope="col">{props.item.person_id}</td>
                <td className="text-center">{props.item.person_firstname}</td>
                <td className="text-center">{props.item.person_lastname}</td>
                <td className="text-center">{birthdate.getUTCDate()+1}/{(birthdate.getUTCMonth() + 1)}/{birthdate.getUTCFullYear()}</td>
                <td className="text-center">
                        <button name="edit" className="btn btn-outline-info ml-1" onClick={()=>{setUserData(props.item); props.setWantToEdit(true)}} ><FaEdit alt="edit" className="icon" /></button>
                        <button name="delete" className="btn btn-outline-info ml-1" onClick={()=>{postServiceData("deleteUser",{id:props.item.person_id});setReload(true)}} ><MdDeleteForever alt="delete" className="icon"  color={"red"} /></button>
                </td>
            </tr>
        </>
    );
}
  
