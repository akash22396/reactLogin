import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Axios from 'axios'
// import server_url from '../api'
import { NavLink } from 'react-router-dom'
import localStorage from 'localStorage'
import { userLoginAction } from '../store/actions/userLoginAction'
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMount: false,
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token != null && this.props.loginStatus === false) {
            // this.userLoginData(token)
            this.props.userData()
        }
    }

    componentDidUpdate() {

    }
    Logout() {
        localStorage.removeItem("userData");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        this.props.login(false);
        this.props.userData();
    }
    render() {
        let { username } = this.props.getUserData ? this.props.getUserData : ''
        // console.log(this.props.getUserData);
        return (
            <React.Fragment>
                <section className='headerNavShadow'>
                    <div className='container'>
                        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white ">
                            <NavLink to='/' className='navbar-brand appLogo'>Logo</NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                    <li className="nav-item ">
                                        <NavLink to='/' className='nav-link'>Home</NavLink>
                                    </li>
                                    {this.props.loginStatus ? <React.Fragment>

                                        <li className="nav-item">
                                            <NavLink to='/user_profile' className='nav-link'>{username}</NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to='/user_profile' className='nav-link'>Profile</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/' onClick={this.Logout.bind(this)} className='nav-link'>Logout</NavLink>
                                        </li>
                                    </React.Fragment> :
                                        <React.Fragment>
                                            <li className="nav-item">
                                                <NavLink to='/login' className='nav-link'>Login</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to='/signup' className='nav-link' >Signup</NavLink>
                                            </li>
                                        </React.Fragment>
                                    }
                                </ul>
                            </div>
                        </nav>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapGetState = state => {
    return {
        loginStatus: state.login,
        getUserData: state.userInfo
    }
}

const mapDispatchState = dispatch => {
    return {
        login: (data) => dispatch({ type: 'LOGIN_ST', payload: data }),
        userData: data => dispatch(userLoginAction(data))
    }
}

export default connect(mapGetState, mapDispatchState)(Header)
