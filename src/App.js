import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Header from './components/Header';
import Homepage from './components/Homepage';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import Forbidden from './components/Forbidden';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import Error from './components/Error';
import NotFound from './components/NotFound';

const HeaderWithContext = withContext(Header);
const HomepageWithContext = withContext(Homepage);
const CourseDetailsWithContext = withContext(CourseDetails);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
    <BrowserRouter>
        <div>
            <HeaderWithContext />

            <Switch>
                <Route exact path="/" render={() => <Redirect to={'/courses'} /> } />
                <Route exact path="/courses" component={HomepageWithContext} />
                <Route path="/courses/:id" render={(props) => <CourseDetailsWithContext id={props.match.params.id}/> } />
                <PrivateRoute path="/create-course" component={CreateCourseWithContext} />
                <PrivateRoute path="/update-course" component={UpdateCourseWithContext} />
                <PrivateRoute path="/authenticated" component={AuthWithContext} />
                <PrivateRoute path="/settings" component={AuthWithContext} />
                <Route path="/signin" component={UserSignInWithContext} />
                <Route path="/signup" component={UserSignUpWithContext} />
                <Route path="/signout" component={UserSignOutWithContext} />
                <Route path="/error" exact={true} component={Error}/>
                <Route path="/not-found" exact={true} component={NotFound}/>
                <Route path="/forbidden" exact={true} component={Forbidden}/>
            </Switch>
        </div>
    </BrowserRouter>
);
