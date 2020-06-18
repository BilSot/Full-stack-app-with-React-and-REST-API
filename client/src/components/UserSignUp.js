import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from './Form';

/**
 * This component is responsible for rendering the Sign up form
 */
export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPass: '',
        errors: [],
    }

    constructor(props) {
        super(props);
        this.mailAddressRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPass,
            errors,
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder="First Name"/>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder="Last Name"/>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder="Email Address"/>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={this.change}
                                    placeholder="Password"/>
                                <input
                                    id="confirmPass"
                                    name="confirmPass"
                                    type="password"
                                    value={confirmPass}
                                    onChange={this.change}
                                    placeholder="Confirm Password"/>
                            </React.Fragment>
                        )}/>
                    <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                    </p>
                </div>
            </div>
        );
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
     * Performs a check about the validity of all the fields on the form
     * Uses the Context's createUser function which makes a call to the API and adds the user to the database
     */
    submit = () => {

        const {context} = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPass
        } = this.state;

        // New user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPass
        };

        let errors = [];
        if(firstName === '' ||
            lastName === '' ||
            emailAddress === '' ||
            password === ''){
            errors.push("All the fields are mandatory. Please fill them in.\n");

        }

        if(password !== confirmPass){
            errors.push("Passwords don't match");
        }
        if(emailAddress !== '' && !this.mailAddressRegExp.test(emailAddress)){
            errors.push("Please insert a valid email address");
        }

        if(errors.length > 0){
            this.setState({
                errors: errors
            });
            return;
        }

        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    console.log(errors);
                    this.setState({
                        errors: errors
                    });
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => this.props.history.push('/'));
                    console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
                }
            })
            .catch(err => { // handle rejected promises
                console.log(err);
                this.props.history.push('/error');
            });
    }

    /**
     * Redirects the user to the homepage
     */
    cancel = () => {
        this.props.history.push('/');
    }
}
