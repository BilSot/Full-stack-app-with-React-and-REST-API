import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {Button, Modal} from "react-bootstrap";
const ReactMarkdown = require('react-markdown');

/**
 *
 */
class CourseDetails extends Component {

    state = {
        isModalVisible: false,
        canBeUpdated: false,
        course: {},
        user: {},
        errors: []
    }

    /**
     * When the component first loads, the Context's getCourse function makes a call to the API to retrieve the course's info
     * and updates the state object
     * Depending on the API response's status, it redirects the user to the according page
     */
    componentDidMount() {
        const {context} = this.props;
        const courseId = this.props.id;
        const {authenticatedUser} = context;

        context.data.getCourse(courseId)
            .then((response) => {
                if (response.status === 404) {
                    this.props.history.push('/notfound');
                } else if (response === 500) {
                    this.props.history.push('/error');
                } else {
                    let obj = {
                        course: response,
                        user: response.User
                    }

                    if (authenticatedUser !== null) {
                        if (response.userId === authenticatedUser.id) {
                            obj["canBeUpdated"] = true;
                        } else {
                            obj["canBeUpdated"] = false;
                        }
                    }

                    this.setState(obj);
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
                        <div className="grid-100">
                            <span>
                                {
                                    this.state.canBeUpdated ?
                                        <NavLink className="button btn-primary" to={{
                                            pathname: this.canUpdate()
                                        }}>Update Course</NavLink> :
                                        null
                                }
                                {
                                    this.state.canBeUpdated ?
                                        this.modal(course) :
                                        null
                                }
                        </span>
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
                            <ReactMarkdown source={course.description}/>
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
                                    <ReactMarkdown source={course.materialsNeeded}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Checks if the user has right to update the course
     * If yes, they are redirected to the 'update course' page
     * Otherwise the 'Forbidden' page is displayed
     * @return {string}
     */
    canUpdate = () => {
        if (this.state.canBeUpdated) {
            return `/courses/${this.state.course.id}/update`;
        } else {
            return "/forbidden";
        }
    }

    /**
     * Displays the modal dialog for confirming of the course's deletion action
     * @param course
     * @return {JSX}
     */
    modal = (course) => {
        return (
            <React.Fragment>
                <Button className="button" onClick={() => this.setState({isModalVisible: true})}>Delete Course</Button>
                <Modal open={true} show={this.state.isModalVisible}
                       onHide={() => this.setState({isModalVisible: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete "{course.title}"?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            this.deleteCourse(course);
                            this.setState({isModalVisible: false});
                        }}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={() => this.setState({isModalVisible: false})}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }

    /**
     * Performs a call to the Context's deleteCourse function which makes a call to the API for deletion of the course
     * If success, redirects to the home page
     * Otherwise the according page, to the response's status, is shown
     * @param course
     */
    deleteCourse = (course) => {
        const {context} = this.props;
        const loggedInUser = context.authenticatedUser;

        context.data.deleteCourse(course, loggedInUser.emailAddress, loggedInUser.password)
            .then(response => {
                if (response === 204) {
                    this.props.history.push('/');
                } else if (response === 500) {
                    this.props.history.push('/error');
                } else if (response === 404) {
                    this.props.history.push('/not-found');
                }
            })
    }
}

export default withRouter(CourseDetails);
