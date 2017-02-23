import React from 'react'
import { browserHistory } from 'react-router'
import Store from './redux'

export default React.createClass({
    clickBtn(event) {
        Store.dispatch({type: 'INCREMENT'})
        let userName='youth',repo='foo'
        const path = `/repos/${userName}/${repo}`
        browserHistory.push(path)
    },
    render() {
        return <div>Home
            <button onClick={this.clickBtn}>switch route</button>
        </div>
    }
})