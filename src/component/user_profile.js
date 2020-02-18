import React, { Component } from 'react'
import Header from '../shared/header'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import Axios from 'axios'
import { userLoginAction } from '../store/actions/userLoginAction'
import server_url from '../api'
class user_profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMount: false,

        }
    }
    componentDidMount() {
        this.props.userData()
        setTimeout(() => {
            this.setState({ isMount: true })
        }, 1000);
    }
    render() {
        let { username, email, profile_image } = this.props.getUserData ? this.props.getUserData : ''

        // console.log(this.props.userInfo);
        return (
            <div>
                <Header />
                {this.state.isMount ? this.props.loginStatus === true ?
                    <React.Fragment>
                        <section>
                            <div className='container'>
                                <div className='row py-5 justify-content-center'>
                                    <div className='col-12 text-center'>
                                        <img src={server_url + `/${profile_image}`} alt='' className=' img-fluid' style={{ height: '140px', width: '140px' }} />
                                        <br />
                                        {username}<br />{email}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </React.Fragment>
                    : <Redirect to='/login' /> : ''
                }

            </div>
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
export default connect(mapGetState, mapDispatchState)(user_profile)
