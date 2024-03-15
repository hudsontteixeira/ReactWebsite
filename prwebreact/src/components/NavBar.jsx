import React, { Component } from 'react';
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { Route, Link, Routes, useLocation } from 'react-router-dom';

export default function NavBar () {
    function removeToken(){
        sessionStorage.removeItem('token')
      }
      const location = useLocation();
      const { hash, pathname, search } = location;

		return (
            <>
            <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: "#00888d"}}>
                <div className="container" >
                    <div className="row" style={{width:"70%"}}>
                        <FaRegCircleUser  size={30} color='#ffffff' />
                        <p className="ml-3 text-white" >Wellcome!</p>
                    </div>
                    <div className="row justify-content-center" style={{width:"70%"}}>
                    {pathname=="/users" && <p className=" font-weight-bold text-white" >Users List</p>}
                    {pathname=="/books" && <p className=" font-weight-bold text-white" >Books List</p>}
                    {pathname=="/borrows" && <p className=" font-weight-bold text-white" >Borrows List</p>}
                    {pathname=="/user" && <p className=" font-weight-bold text-white" >User Edition</p>}
                    {pathname=="/book" && <p className=" font-weight-bold text-white" >Book Edition</p>}

                    </div>
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"> <a className="nav-link text-white" href="/users" >Users</a></li>
                            <li className="nav-item"> <a className="nav-link text-white" href="/books" >Books</a></li>
                            <li className="nav-item"> <a className="nav-link text-white" href="/borrows" >Borrows</a></li>
                            <li className="nav-item mt-1"><a href="/" onClick={()=>{removeToken()}} ><RiLogoutBoxFill size={30} color='#ffffff' /></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            </>
        );
}
