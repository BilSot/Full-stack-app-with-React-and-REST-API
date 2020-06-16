import React, {Component} from 'react';
import Form from "./Form";
import CourseFormFields from "./CourseFormFields";

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
                let {title, description, estimatedTime, materialsNeeded} = response;
                this.setState({
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded
                });

                if (authenticatedUser !== null) {
                    if (response.userId !== authenticatedUser.id) {
                        this.props.history.push('/forbidden');
                    }
                } else if (response.status === 404) {
                    this.props.history.push('/not-found');
                } else if (response === 500) {
                    this.props.history.push('/error');
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

    cancel = () => {
        this.props.history.push('/');
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

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
                    this.props.history.push('/not-found');
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
