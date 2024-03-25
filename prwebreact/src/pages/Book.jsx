import React,{ useState, useEffect } from "react";
import {BookContext} from '../context/bookContext';
import { postServiceData,stringToDate } from "../api/util";
import {Navigate} from "react-router-dom";
import NavBar from "../components/NavBar";

function Book(props) {
    const {bookData} = React.useContext(BookContext);
    
    const [dataSaved,setDataSaved] = useState();  
    const [title,setTitle] = useState(bookData.book_title);
    const [authors,setAuthors] = useState(bookData.book_authors);
    const [borrows,setBorrows] = useState(null);
    const [reload,setReload] = useState(null);

    const handleSubimit = (e) => {
        e.preventDefault();
        bookData.book_id != -1 ? 
            postServiceData("updateBook", {
                book_title: title,
                book_authors: authors,
                id: bookData.book_id
            })
            .then((data)=>{console.log(data);setDataSaved(data);})
        : postServiceData("createBook", {
            book_title: title,
            book_authors: authors
        })
        .then((data)=>{console.log("createdBook",data);setDataSaved(data);})

    }
    const token = props.getToken();
    useEffect(()=>{
        postServiceData("borrows", {})
            .then((data)=>{setBorrows(data)})
    },[reload])

    if(!token){
        return(<Navigate to="/" />)
    }
    if(dataSaved && dataSaved.ok === 1){return <Navigate to="/books" />;}

    return (
        <>
        <NavBar />
        <div className="py-3">
            <div className="container">
                <div className="row">
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <form onSubmit={handleSubimit} method="POST">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th scope="col">id #</th>
                                            <td>
                                                    <p name="id">{bookData.book_id != -1 ? bookData.book_id : "NEW"}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <td><input type="text" className="form-control" name="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/></td>
                                        </tr>
                                        <tr>
                                            <th scope="col">Authors</th>
                                            <td><input type="text" className="form-control" name="Authors" value={authors} onChange={(e)=>{setAuthors(e.target.value)}} /></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td scope="col" colspan="2" className="text-center"><button type="submit" className="btn btn-block btn-primary" style={{backgroundColor: "#00888d"}}>Save</button></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </form>
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
                                        {bookData.book_id && borrows && borrows.sort((a, b) => new Date(stringToDate(a.borrow_date)) - new Date(stringToDate(b.borrow_date))).map((item, i) => {
                                            
                                           let bdate = stringToDate(item.borrow_date);
                                           let breturn = item.borrow_return != null ? stringToDate(item.borrow_return) : null ;
                                           if(item.book_id == bookData.book_id){
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
                                            }
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
  
  export default Book;