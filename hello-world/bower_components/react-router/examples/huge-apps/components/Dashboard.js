import React, {Component} from 'react'
import {Link} from 'react-router'
class Dashboard extends Component {
    componentDidMount(){
      // debugger
    }
    render() {
        const {courses} = this.props
        let description = <p>
            Open the network tab as you navigate. Notice that only the amount of
            your app that is required is actually downloaded as you navigate
            around. Even the route configuration objects are loaded on the fly.
            This way, a new route added deep in your app will not affect the
            initial bundle of your application.
        </p>
        if (this.props.notFromHome) {
            description=null;
        }
        return (
            <div>
                <h2>Super Scalable Apps</h2>
                {description}
                <h2>Courses</h2>{' '}
                <ul>
                    {courses.map(course => (
                        <li key={course.id}>
                            <Link to={`${this.props.route?this.props.route:''}/course/${course.id}`}>{course.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default Dashboard
