import React from 'react';
import {BookContext} from '../context/bookContext';
import {postServiceData} from "../api/util";
export function BooksInList(props) {
    const {bookData,setBookData} = React.useContext(BookContext);  

    return (
        <>
            <tr>
                <td className="text-center" scope="col">{props.item.book_id}</td>
                <td className="text-center">{props.item.book_title}</td>
                <td className="text-center">{props.item.book_authors}</td>
                <td className="text-center">
                        <button name="edit" className="btn" onClick={()=>{setBookData(props.item); props.setWantToEdit(true)}} ><img src="img/edit.png" alt="edit" className="icon" /></button>
                        <button name="delete" className="btn" onClick={()=>{postServiceData("deleteBook",{id:props.item.book_id})}} ><img src="img/delete.png" alt="delete" class="icon" /></button>
                </td>
            </tr>
        </>
    );
}
  
