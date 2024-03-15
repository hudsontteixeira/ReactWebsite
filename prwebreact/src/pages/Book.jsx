import React,{ useState } from "react";
import {BookContext} from '../context/bookContext';
import { postServiceData } from "../api/util";
import {Navigate} from "react-router-dom";
import NavBar from "../components/NavBar";

function Book(props) {
    const {bookData} = React.useContext(BookContext);
    
    const [dataSaved,setDataSaved] = useState();  
    const [title,setTitle] = useState(bookData.book_title);
    const [authors,setAuthors] = useState(bookData.book_authors);

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
  
  export default Book;