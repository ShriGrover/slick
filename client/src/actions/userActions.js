import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    GETALL_REQUEST,
    GETALL_SUCCESS,
    GETALL_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE
} from './actionTypes';
import { userService } from '../_services/index';
import { alert } from './alert';
import { history } from '../_helpers/index';

export const user = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password, adminstatus) {
    return dispatch => {
        dispatch( request( { username } ) );

        userService.login( username, password, adminstatus )
            .then(
                user => {
                    dispatch( success( user ) );
                    history.push( '/' );
                },
                error => {
                    dispatch( failure( error.toString() ) );
                    dispatch( alert.error( error.toString() ) );
                }
            );
    };

    function request(user) {
        return { type: LOGIN_REQUEST, user }
    }

    function success(user) {
        return { type: LOGIN_SUCCESS, user }
    }

    function failure(error) {
        return { type: LOGIN_FAILURE, error }
    }
}

function logout() {
    userService.logout();
    return { type: LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch( request( user ) );

        userService.register( user )
            .then(
                user => {
                    dispatch( success() );
                    history.push( '/login' );
                    dispatch( alert.success( 'Registration successful' ) );
                },
                error => {
                    dispatch( failure( error.toString() ) );
                    dispatch( alert.error( error.toString() ) );
                }
            );
    };

    function request(user) {
        return { type: REGISTER_REQUEST, user }
    }

    function success(user) {
        return { type: REGISTER_SUCCESS, user }
    }

    function failure(error) {
        return { type: REGISTER_FAILURE, error }
    }
}

function getAll() {
    return dispatch => {
        dispatch( request() );

        userService.getAll()
            .then(
                users => dispatch( success( users ) ),
                error => dispatch( failure( error.toString() ) )
            );
    };

    function request() {
        return { type: GETALL_REQUEST }
    }

    function success(users) {
        return { type: GETALL_SUCCESS, users }
    }

    function failure(error) {
        return { type: GETALL_FAILURE, error }
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch( request( id ) );

        userService.delete( id )
            .then(
                user => dispatch( success( id ) ),
                error => dispatch( failure( id, error.toString() ) )
            );
    };

    function request(id) {
        return { type: DELETE_REQUEST, id }
    }

    function success(id) {
        return { type: DELETE_SUCCESS, id }
    }

    function failure(id, error) {
        return { type: DELETE_FAILURE, id, error }
    }
}