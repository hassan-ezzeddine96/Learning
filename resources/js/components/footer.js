import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Footer extends Component {
    render() {
        return (
            <div>
                <h1>hello</h1>
            </div>
        );}
}
if (document.getElementById('footer')) {
    ReactDOM.render(<Footer />, document.getElementById('footer'));
}
