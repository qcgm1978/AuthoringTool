import React from 'react';
const RouterTwo = React.createClass({
    componentDidMount() {
        // Decode entities in the URL
        // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
        // window.location.hash = window.decodeURIComponent(window.location.hash);
        // const scrollToAnchor = () => {
        //     const hashParts = window.location.hash.split('#');
        //     if (hashParts.length > 2) {
        //         const hash = hashParts.slice(-1)[0];
        //         document.querySelector(`[name=${hash}]`).scrollIntoView();
        //     }
        // };
        // scrollToAnchor();
        // window.onhashchange = scrollToAnchor;
    },
    render()
    {
        return <div>
            <div style={{height: '560px'}}>RouterTwo</div>
            <p>block10<a name="block10"></a></p>
        
        </div>
    }
})
export default RouterTwo