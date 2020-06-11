import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

class CourseDetails extends Component {
    state = {
        course: {},
        user: {},
        errors: []
    }

    componentDidMount() {
        const {context} = this.props;
        const courseId = this.props.id;

        context.data.getCourse(courseId)
            .then((response) => {
                if (response.status === 404) {
                    this.props.history.push('/not-found');
                } else {
                    this.setState({
                        course: response,
                        user: response.User
                    })
                }
            }).catch((error) => {
            this.setState({
                errors: error
            })
            console.log("Error" + error);
        });
    }

    render() {
        const {course} = this.state;
        const {user} = this.state;
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100"><span>
                            <NavLink className="button" to={'/'}>Update Course</NavLink>
                            <NavLink className="button" to={'/'}>Delete Course</NavLink></span>
                            <NavLink className="button button-secondary" to={'/'}>Return to List</NavLink>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {user.firstName} {user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={course.description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime} hours</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown source={course.materialsNeeded} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CourseDetails);
