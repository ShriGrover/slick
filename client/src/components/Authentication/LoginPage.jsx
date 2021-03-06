import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { user } from '../../actions';

class LoginPage extends Component {
    constructor(props) {
        super( props );

        // reset login status
        this.props.dispatch( user.logout() );

        this.state = {
            username: '',
            password: '',
            submitted: false,
            adminStatus: false, // flag if user is logging in as admin
            isAdmin: false, // flag indicating whether or not user is actually an admin
        };

        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        // const { name, value } = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        this.setState( { [ name ]: value } );
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState( { submitted: true } );
        const { username, password, adminStatus } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch( user.login( username, password, adminStatus ) );
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted, adminStatus } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + ( submitted && !username ? ' has-error' : '' )}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username}
                               onChange={this.handleChange}/>
                        {submitted && !username &&

                        <div className="help-block">Username is required</div>
                        }

                    </div>
                    <div className={'form-group' + ( submitted && !password ? ' has-error' : '' )}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password}
                               onChange={this.handleChange}/>
                        {submitted && !password &&

                        <div className="help-block">Password is required</div>
                        }

                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        {loggingIn &&

                        <img
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }

                        <Link to="/register" className="btn btn-link">Register</Link>
                        <label>
                            admin

                            <input
                                name="adminStatus"
                                type="checkbox"
                                checked={this.state.adminStatus}
                                onChange={this.handleChange}/>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect( mapStateToProps )( LoginPage );
export { connectedLoginPage as LoginPage }; 