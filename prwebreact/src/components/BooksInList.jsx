import React,{useState} from 'react';
import {BookContext} from '../context/bookContext';
import {postServiceData} from "../api/util";
import {Navigate} from "react-router-dom"

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
                        <button name="edit" className="btn" onClick={()=>{setBookData(props.item); props.setWantToEdit(true)}} ><img src="img/edit.png" alt="edit" className="icon" /></button>
                        <button name="delete" className="btn" onClick={()=>{postServiceData("deleteBook",{id:props.item.book_id}); setReload(true)}} ><img src="img/delete.png" alt="delete" class="icon" /></button>
                </td>
            </tr>
        </>
    );
}
  
