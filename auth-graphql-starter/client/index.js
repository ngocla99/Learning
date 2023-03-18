import ApolloClient, { createNetworkInterface } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { hashHistory, Route, Router } from 'react-router';
import App from './components/App';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin',
    },
});

const client = new ApolloClient({
    networkInterface,
    dataIdFromObject: (o) => o.id,
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <Route path='/login' component={LoginForm}></Route>
                    <Route path='/signup' component={SignupForm}></Route>
                    <Route path='/dashboard' component={requireAuth(Dashboard)}></Route>
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
