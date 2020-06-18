import React from 'react';
import {Link} from 'react-router-dom';

/**
 * This component is responsible for rendering the Header of the application
 * When there is a logged-in user, the content of the header changes to a welcome message
 * Otherwise the buttons for sign in and sigh up are shown
 */
export default class Header extends React.PureComponent {
    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        return (
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">
                        <Link className="header" to='/'>Courses</Link>
                        </h1>
                    <nav>
                        {
                            authUser ?
                                <React.Fragment>
                                    <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                                    <Link className="signout" to="/signout">Sign Out</Link>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Link className="signup" to="/signup">Sign Up</Link>
                                    <Link className="signin" to="/signin">Sign In</Link>
                                </React.Fragment>
                        }
                    </nav>
                </div>
            </div>
        );
    }
};
