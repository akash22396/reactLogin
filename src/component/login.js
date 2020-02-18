import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import server_url from '../api'
import Header from '../shared/header'
import localStorage from 'localStorage'
import { Redirect } from 'react-router-dom'
import { userLoginAction } from "../store/actions/userLoginAction";
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMount: false,
            email: "",
            password: ""
        }
    }
    componentDidMount() {
        this.setState({ isMount: true })
    }

    componentDidUpdate() {

    }

    loginForm(e) {
        e.preventDefault();
        let form = {
            email: this.state.email,
            password: this.state.password
        }
        Axios.post(server_url + `/user/login`, form).then(res => {
            // console.log(res.data)
            const st = res.data
            // console.log(st.msg);
            if (st.msg === "login successfully") {
                localStorage.setItem('token', st.token);
                // this.props.loginStatus(true);
                this.props.userData();
                // this.props.login(true)
            } else {
                this.props.login(false)
            }
        }).catch(error => {
            console.log(error);
            // console.log('err');
        })
    }

    onFormChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        return (
            <Fragment>
                {this.state.isMount ? this.props.loginStatus ? <Redirect to='/' /> : <Fragment>
                    <Header />
                    <div className='container'>
                        <div className='row py-5 justify-content-center'>
                            <div className='col col-md-6 '>
                                <h3 className='h3'>Login</h3>
                                {/* login  status {this.props.loginStatus ? 'true' : 'fasle'} */}
                                <form onSubmit={this.loginForm.bind(this)} >
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input type='email' className='form-control form-control-md' name='email' value={this.state.email} onChange={this.onFormChange.bind(this)} required />

                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type='password' className='form-control form-control-md' name='password' value={this.state.password} onChange={this.onFormChange.bind(this)} required />
                                    </div>


                                    <button type='submit' className='btn btn-md btn-primary'>Submit </button>
                                </form>
                            </div>
                            <div className='col-md-6 '></div>
                        </div>


                    </div>

                </Fragment> : ''
                }
            </Fragment>
        )
    }
}
const mapGetState = state => {
    return {
        loginStatus: state.login
    }
}

const mapDispatchState = dispatch => {
    return {
        login: (data) => dispatch({ type: 'LOGIN_ST', payload: data }),
        userData: data => dispatch(userLoginAction(data))
    }
}
export default connect(mapGetState, mapDispatchState)(Login)
