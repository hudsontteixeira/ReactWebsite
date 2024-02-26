import React,{useEffect,useState} from "react";
import {Navigate} from "react-router-dom"
import { postServiceData } from '../api/util';
import {BooksInList} from "../components/BooksInList";
import {BookContext} from '../context/bookContext';
import NavBar from "../components/NavBar";
function Books (props) {
    const [books, setBooks] = useState([]);
    const [wantToEdit, setWantToEdit] = useState(false); 
    const {bookData,setBookData} = React.useContext(BookContext);  
    useEffect(()=>{
        postServiceData("books", {})
            .then((data)=>{setBooks(data)})
    },[])
    function handleAddBook(){
        setBookData({book_id:-1,book_title:"",book_authors:""});
        setWantToEdit(true);
    }
    const token = props.getToken();
    if(!token){
        return(<Navigate to="/" />)
    }
    if (wantToEdit) {
        return <Navigate push to="/book" />;
    }

    return (
        <>
        <NavBar />
            <div className="py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="">Create / Edit Book page</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                    <tr>
                                        <th scope="col" class="text-center">book id #</th>
                                        <th scope="col" class="text-center">Book Title</th>
                                        <th scope="col" class="text-center">Author</th>
                                        <th scope="col"></th>
                                    </tr>
                            </thead> 
                            <tbody>
                            {books.map((item,i) => (
                                <BooksInList item={item} setWantToEdit={setWantToEdit} key={i}  />
                            ))}
                            </tbody>
                            <tfoot>
                                    <tr id="addNew">
                                        <td scope="col" colspan="3"></td>
                                        <td class="text-center">
                                            <button class="btn"><img src="img/plus.png" alt="add" onClick={handleAddBook} class="icon" /></button>
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
  
  export default Books;
