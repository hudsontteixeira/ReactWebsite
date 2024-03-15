import React,{useState} from 'react';
import {BookContext} from '../context/bookContext';
import {postServiceData} from "../api/util";
import {Navigate} from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export function BooksInList(props) {
    const {bookData,setBookData} = React.useContext(BookContext);  
    const [reload,setReload] = useState(false)
    if (reload) {
        return <Navigate push to="/books" />;
    }
    return (
        <>
            <tr>
                <td className="text-center" scope="col">{props.item.book_id}</td>
                <td className="text-center">{props.item.book_title}</td>
                <td className="text-center">{props.item.book_authors}</td>
                <td className="text-center">
                        <button name="edit" className="btn btn-outline-info m-1" onClick={()=>{setBookData(props.item); props.setWantToEdit(true)}} ><FaEdit alt="edit" className="icon"  /></button>
                        <button name="delete" className="btn btn-outline-info m-1" onClick={()=>{postServiceData("deleteBook",{id:props.item.book_id}); setReload(true)}} ><MdDeleteForever  alt="delete" color='red' className="icon"  /></button>
                </td>
            </tr>
        </>
    );
}
  
