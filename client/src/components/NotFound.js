import React from 'react';
import img from "../images/404.png";

export default () => (
    <React.Fragment>
        <div className="img-container">
            <img src={img} alt='not-found'/>
        </div>
        <div className="bounds content-container">
            <h1>Not Found</h1>
            <h3>Sorry! We couldn't find the page you're looking for.</h3>
        </div>
    </React.Fragment>
);
