import React from 'react'
import { Link } from 'react-router'
export default React.createClass({
    render(){
        return <div>
            <Link to="#/about">About</Link>
            <Link to="/two">Two</Link>
            <Link to="/two#block10">/two#block10</Link>
            
            {/*<a href="#/about">about</a>*/}
            {/*< a*/}
                {/*href="#/two"> two*/}
                {/*<*/}
                {/*/ a >*/}
                {/*< a*/}
                    {/*href="#/two#block10"> two#block10*/}
                    {/*<*/}
                    {/*/ a >*/}
        </div>
    }
    })

 