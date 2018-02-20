import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class NotFound extends Component {

  static notFound = true;

  render() {
    return <h3>Page not found</h3>
  }
}

export default NotFound = connect()(NotFound)
