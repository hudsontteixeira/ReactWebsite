import React,{useEffect,useState} from "react";
import {Navigate} from "react-router-dom"
import { postServiceData,stringToDate } from '../api/util';
import {BooksInList} from "../components/BooksInList";
import {BookContext} from '../context/bookContext';
import NavBar from "../components/NavBar";
function Borrows (props) {
    const [reload,setReload] = useState(false);  
    const [borrows,setBorrows] = useState(null);
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState(null);    
    useEffect(()=>{
        postServiceData("borrows", {})
            .then((data)=>{setBorrows(data)})
    },[reload])

    const token = props.getToken();
    if(!token){
        return(<Navigate to="/" />)
    }


    return (
        <>
        <NavBar />
            <div className="py-3">
            <div className="container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 form-group">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nom Prenom</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Return</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {borrows && borrows.map((item, i) => {
                                           let bdate = stringToDate(item.borrow_date);
                                           let breturn = item.borrow_return != null ? stringToDate(item.borrow_return) : null ;

                                            return(
                                                <tr key={i}>
                                                <td>{item.person_lastname} {item.person_firstname}</td>
                                                <td scope="col" className="text-center">
                                               <p> {bdate}</p>
                                                </td>
                                                <td>{item.book_title}</td>
                                                <td className="text-center">
                                                            {item.borrow_return == null ? <button className="btn btn-outline-info " name="return" 
                                                                    onClick={()=>{ 
                                                                        let currentDate = new Date();
                                                                        let postdata= `${currentDate.getUTCFullYear()}-${(currentDate.getUTCMonth()+1)}-${currentDate.getUTCDate()}` 
                                                                        console.log("postdata",postdata)
                                                                        postServiceData("updateBorrow", {id:item.borrow_id,return_date:postdata}).then((e)=>{setReload(((value)=>!value))})}}>
                                                                <img src="img/return.png" alt="return" className="icon" />
                                                            </button> : <p>{breturn}</p>}
                                                </td>
                                            </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
      </>
    );
  }
  
  export default Borrows;
