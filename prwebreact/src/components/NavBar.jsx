import React, { Component } from 'react';

export default function NavBar () {
		return (
            <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"> <a className="nav-link text-white" href="/users" >Users</a></li>
                            <li className="nav-item"> <a className="nav-link text-white" href="/books" >Books</a></li>
                            <li className="nav-item"> <a className="nav-link text-white" href="/borrows" >Borrows</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            </>
        );
}
