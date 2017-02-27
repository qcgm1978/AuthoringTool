/*globals COURSES:true */
import React, {Component} from 'react'
import Dashboard from '../../components/Dashboard'
import data from './stubs/COURSES'
// import GlobalNav from './GlobalNav'
class App extends Component {
    render() {
        return (
            <div>
                {/*<GlobalNav />*/}
                <div style={{padding: 20}}>
                    {this.props.children || <Dashboard courses={data} notFromHome={true} route="group"/>}
                </div>
            </div>
        )
    }
}
module.exports = App
