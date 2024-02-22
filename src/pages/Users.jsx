import { useState } from "react";
import {Navigate} from "react-router-dom"
function Users(props) {
    const token = props.getToken();
    if(!token){
        return(<Navigate to="/" />)
    }
    return (
        <>
        <div class="py-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="">List of users</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" class="text-center">user #</th>
                                        <th scope="col" class="text-center">FirstName</th>
                                        <th scope="col" class="text-center">LastName</th>
                                        <th scope="col" class="text-center">Birthdate</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                            <td scope="col">{"item.personId"}</td>
                                            <td>{"item.personFirstname"}</td>
                                            <td>{"item.personLastname"}</td>
                                            <td>{"item.personBirthdate"}</td>
                                            <td class="text-center">
                                                <form action="editUser" method="POST">
                                                    <input type="hidden" name="id" value="${item.personId}" />
                                                    <button name="edit" class="btn" formaction="edituser.do"><img src="img/edit.png" alt="edit" class="icon" /></button>
                                                    <button name="delete" class="btn" formaction="deleteuser.do"><img src="img/delete.png" alt="delete" class="icon" /></button>
                                                </form>
                                            </td>
                                        </tr>
                                </tbody>
                                <tfoot>
                                    <tr id="addNew">
                                        <td scope="col" colspan="4"></td>
                                        <td class="text-center">
                                            <form action="createuser.do" method="POST">
                                                <button class="btn"><img src="img/plus.png" alt="add" class="icon" /></button>
                                            </form>
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
  
  export default Users;