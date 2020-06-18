import React, {Component} from 'react';
import Form from "./Form";
import CourseFormFields from "./CourseFormFields";

/**
 * This component is responsible for rendering the Update Course form.
 * It retrieves the course's data from the API with its given id and populates the form's fields.
 * It handles the actions for the update of the course and the cancellation of that action
 */
export default class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    componentDidMount() {
        const {context} = this.props;
        const {authenticatedUser} = context;

        context.data.getCourse(parseInt(this.props.match.params.id))
            .then(response => {
                if (response.error) {
                    if (response.error === 404) {
                        this.props.history.push('/notfound');
                    } else if (response.error === 500) {
                        this.props.history.push('/error');
                    }
                } else {
                    if (authenticatedUser !== null) {
                        if (response.userId !== authenticatedUser.id) {
                            this.props.history.push('/forbidden');
                        } else {
                            let {title, description, estimatedTime, materialsNeeded} = response;
                            this.setState({
                                title,
                                description,
                                estimatedTime,
                                materialsNeeded
                            });
                        }
                    }
                }
            }).catch((error) => {
            this.setState({
                errors: error
            })
            console.log("Error" + error);
        });
    }

    render() {
        const {context} = this.props;
        const loggedInUser = context.authenticatedUser;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        elements={() => (
                            <CourseFormFields title={title}
                                              description={description}
                                              estimatedTime={estimatedTime}
                                              materialsNeeded={materialsNeeded}
                                              authUser={loggedInUser}
                                              onChange={this.change}
                            />)
                        }
                    />
                </div>
            </div>
        )
    }

    /**
     * Returns the user to the previous visited page
     */
    cancel = () => {
        this.props.history.push(`/courses/${this.props.match.params.id}`);
    }

    /**
     * It takes the value of the field which is altered and updates the state object
     * @param event
     */
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    /**
     * Uses the Context's updateCourse function which makes a call to the API to update the current course
     * It checks the response returned from the API and redirects the user accordingly
     */
    submit = () => {
        const {context} = this.props;
        const loggedInUser = context.authenticatedUser;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const course = {
            id: this.props.match.params.id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: loggedInUser.id
        };

        context.data.updateCourse(course, loggedInUser.emailAddress, loggedInUser.password)
            .then(response => {
                if (response === 404) {
                    this.props.history.push('/notfound');
                } else if (Array.isArray(response)) {
                    this.setState({
                        errors: response
                    })
                } else if (response === 500) {
                    this.props.history.push('/error');
                } else if (response === 204) {
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
}
