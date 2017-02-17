import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import LoginForm from './login-form.jsx';
import CommentPanel from './comment-panel.jsx';

class App extends Component {
    render () {        
      return (
            <Router history={hashHistory}>
              <Route path='/' component={LoginForm} />
              <Route path='/:username/comment' component={CommentPanel} />
            </Router>
            );
    }
}
render(<App/>, document.getElementById('app'));     