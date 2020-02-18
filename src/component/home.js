import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import Axios from 'axios'
// import server_url from '../api'
import Header from '../shared/header'
class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMount: false

        }
    }
    componentDidMount() {
        // console.log(this.props.loginStatus)
        this.props.userData()

    }

    componentDidUpdate() {
        // console.log(this.props.loginStatus)
    }
    loginSt() {

    }
    render() {
        return (
            <Fragment>
                <Header />
                <section>
                    <div className='container'>
                        <div className='row py-2'>
                            <div className='col-md-12'>
                                <p>Home  login  status ::> {this.props.loginStatus ? 'true' : 'fasle'}</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <button type='button' onClick={this.loginSt.bind(this)}>Login</button> */}
            </Fragment>
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
        userData: (data) => dispatch({ type: 'USER_DATA', payload: data })
    }
}

export default connect(mapGetState, mapDispatchState)(home)
