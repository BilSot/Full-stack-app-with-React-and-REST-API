import React from 'react';

/**
 * functional component responsible for creating the fields on the Create Course and Update Course form
 * @param props
 * @return {*}
 */
export default (props) => {
    return(
    <React.Fragment>
        <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={props.title}
                    className="input-title course--title--input"
                    onChange={props.onChange}
                    placeholder="Course title..."/>
                <p>By {props.authUser.firstName} {props.authUser.lastName}</p>
            </div>
            <textarea
                id="description"
                name="description"
                type="text"
                value={props.description}
                onChange={props.onChange}
                placeholder="Course description..."/>
        </div>

        <div className="grid-25 grid-right">
            <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            value={props.estimatedTime}
                            onChange={props.onChange}
                            placeholder="Hours"/>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            type="text"
                            value={props.materialsNeeded}
                            onChange={props.onChange}
                            placeholder="List materials..."/>
                    </li>
                </ul>
            </div>
        </div>
    </React.Fragment>
    )
};
