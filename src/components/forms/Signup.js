import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { signup } from '../../actions/users'

class Signup extends Component {
  constructor(props){
    super(props)

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      history: this.props.history
    }
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.signup(this.state)
  }

  render() {
    return(
      <div className="ui container">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui image header">
              <div className="content">
                Create a New Account
              </div>
            </h2>
            <form onSubmit={this.onSubmit} className="ui large form">
              <div className="ui stacked segment">
                <div className="field">
                  <input onChange={this.onChange} type="text" name="username" placeholder="Username" value={this.state.username} required/>
                </div>
                <div className="field">
                  <input onChange={this.onChange} type="text" name="email" placeholder="Email" value={this.state.email} required/>
                </div>
                <div className="field">
                  <input onChange={this.onChange} type="password" name="password" placeholder="Password" value={this.state.password} required/>
                </div>
                <div className="field">
                  <input onChange={this.onChange} type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} required/>
                </div>
                <input className="ui fluid large primary submit button" type="submit" value="Sign Up"/>
              </div>
            </form>
            <div className="ui message">
              Existing User?<NavLink className="item" to="/login"> Log In</NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { signup })(Signup)