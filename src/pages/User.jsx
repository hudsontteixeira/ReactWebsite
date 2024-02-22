import { useState } from "react";
function User(props) {
    return (
        <>
        <div className="py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 >Create / Edit User page</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <form action="saveuser.do" method="POST">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th scope="col">user #</th>
                                            <td>
                                                    <input type="hidden" name="id" value="-1" />
                                                    <input type="hidden" name="id" value="${user.personId}" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="col">FirstName</th>
                                            <td><input type="text" className="form-control" name="FirstName" value="${user.personFirstname}" /></td>
                                        </tr>
                                        <tr>
                                            <th scope="col">LastName</th>
                                            <td><input type="text" className="form-control" name="LastName" value="${user.personLastname}" /></td>
                                        </tr>
                                        <tr>
                                            <th scope="col">Birthdate</th>
                                            <td><input type="date" className="form-control" name="Birthdate" value="${user.personBirthdate}"/></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td scope="col" colspan="2" className="text-center"><button type="submit" className="btn btn-block btn-primary">Save</button></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <form action="addBook" method="POST">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Date</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Return</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                <tr>
                                                    <td scope="col" className="text-center">
                                                        {"item.borrowDate"}
                                                    </td>
                                                    <td>{"item.bookId.bookTitle"}</td>
                                                    <td className="text-center">
                                                                <button className="btn" name="return" 
                                                                        onclick="returnBorrow(this, ${ item.borrowId }); return false;">
                                                                    <img src="img/return.png" alt="return" className="icon" />
                                                                </button>
                                                    </td>
                                                </tr>
                                        </tbody>
                                        <tfoot>
                                        <form action="addBorrow.do" method="POST">
                                            <tr>
                                                <td colspan="2">
                                                    <input type="hidden" name="userID" value="${ user.personId }" />
                                                    <select name="bookID" className="form-control form-select form-select-lg mb-3">
                                                        <option value="-1" selected="selected">-</option>
                                                            <option value="${ book.bookId }">{"book.bookTitle"}</option>
                                                    </select>
                                                </td>
                                                <td  className="text-center">
                                                    <button className="btn"><img src="img/plus.png" alt="add" className="icon" /></button>
                                                </td>
                                            </tr>
                                        </form>
                                        </tfoot>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        </div>
      </>
    );
  }
  
  export default User;