import React from 'react';
import {UserContext} from '../context/userContext';
import {postServiceData} from "../api/util";
export function UsersInList(props) {
    const {userData,setUserData} = React.useContext(UserContext);  

    const birthdate = new Date(props.item.person_birthdate);

    return (
        <>
            <tr>
                <td className="text-center" scope="col">{props.item.person_id}</td>
                <td className="text-center">{props.item.person_firstname}</td>
                <td className="text-center">{props.item.person_lastname}</td>
                <td className="text-center">{birthdate.getUTCDate()+1}/{(birthdate.getUTCMonth() + 1)}/{birthdate.getUTCFullYear()}</td>
                <td className="text-center">
                        <button name="edit" className="btn" onClick={()=>{setUserData(props.item); props.setWantToEdit(true)}} ><img src="img/edit.png" alt="edit" className="icon" /></button>
                        <button name="delete" className="btn" onClick={()=>{postServiceData("deleteUser",{id:props.item.person_id})}} ><img src="img/delete.png" alt="delete" class="icon" /></button>
                </td>
            </tr>
        </>
    );
}
  
