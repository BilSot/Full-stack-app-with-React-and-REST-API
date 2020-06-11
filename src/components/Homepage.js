import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import CourseBox from "./CourseBox";

export default class Homepage extends Component {
    state = {
        courses: [],
        errors: []
    };

    componentDidMount() {
        const {context} = this.props;
        context.data.getCourses()
            .then(data => {
                if (data) {
                    this.setState({
                        courses: data
                    });
                }
            })
            .catch((error)=> {
                this.setState({
                    errors: error
                });
                this.props.history.push('/error');
            });
    }

    render() {
        let courses = this.state.courses.map((course) => {
            return <CourseBox key={course.id} course={course} />
        })
        return (
            <div className="bounds">
                {courses}
                <div className="grid-33">
                    <NavLink className="course--module course--add--module" to='/'>
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                </NavLink>
                </div>
            </div>
        );
    }
}
