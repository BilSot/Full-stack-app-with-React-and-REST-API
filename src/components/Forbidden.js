import React from 'react';
import img from '../images/forbidden.png';

export default function Forbidden() {
    return (
        <React.Fragment>
            <div className="img-container">
                <img src={img} alt='forbidden'/>
            </div>
            <div className="bounds content-container">
                <h1>Forbidden</h1>
                <h2>Only the author of this course is authorised to edit/delete this course.</h2>
            </div>
        </React.Fragment>
    )
};
