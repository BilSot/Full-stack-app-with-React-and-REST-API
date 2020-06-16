import React from 'react';
import {NavLink} from 'react-router-dom';

const CourseBox = (props) => {
    return (
    <div className="grid-33">
        <NavLink className="course--module course--link" to={`/courses/${props.course.id}`}>
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{props.course.title}</h3>
        </NavLink>
    </div>
)};

export default CourseBox;
