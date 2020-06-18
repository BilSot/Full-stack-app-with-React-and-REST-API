import React from 'react';
import img from "../images/500.png";

const UnhandledError = (props) => {
    return (
        <React.Fragment>
            <div className="img-container">
                <img src={img} alt='server-error'/>
            </div>
            <div className="bounds content-container">
                <h1>Error</h1>
                <h3>Sorry! We just encountered an unexpected error.</h3>
            </div>
        </React.Fragment>
    )};

export default UnhandledError;
