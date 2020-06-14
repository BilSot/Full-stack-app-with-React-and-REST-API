import React, {Component} from 'react';
import Form from "./Form";
import CourseFormFields from "./CourseFormFields";

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
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
                        submitButtonText="Create Course"
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

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: loggedInUser.id
        };

        context.data.createCourse(course, loggedInUser.emailAddress, loggedInUser.password)
            .then(response => {
                if (Array.isArray(response)) {
                    this.setState({
                        errors: response
                    });
                }else if(response === 500){
                    this.props.history.push('/error');
                }
                else{
                    this.props.history.push('/courses/' + response);
                }
            })
            .catch();

    }
}

