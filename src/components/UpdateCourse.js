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
        if (this.props.history.location.aboutProps) {
            const {course} = this.props.history.location.aboutProps;
            // const {user} = this.props.history.location.aboutProps;
            this.setState({
                title: course.title,
                description: course.description,
                estimatedTime: course.estimatedTime,
                materialsNeeded: course.materialsNeeded
            });
        }

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
                <h1>Create Course</h1>
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
                            />
                        )}/>
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
        const userForAuthOnly = context.userNotForStorage;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const course = {
            id: this.props.history.location.aboutProps.course.id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: loggedInUser.id
        };

        context.data.updateCourse(course, userForAuthOnly.username, userForAuthOnly.password)
            .then(response => {
                if (response.status === 404) {
                    this.props.history.push('/not-found');
                } else {
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
}
