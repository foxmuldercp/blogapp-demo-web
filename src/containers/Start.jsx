import React, {Component} from 'react'
import {connect} from 'react-redux'

import {push} from 'react-router-redux'
import {Link} from 'react-router'

import { Card, Col, Row, Button } from 'antd';

class Start extends Component {

  componentWillMount(){
    if (this.props.user && this.props.user.email) {
      this.props.dispatch(push('/board'))
    }
  }

  render() {
    return (
     <div style={{ background: '#ECECEC', padding: '20px' }}>
      <Row>
        <Col span="6" style={{'margin-left': '10px'}}>
          <Card title="DEMO">
            <span><h3>Пользователь (user):</h3> test@example.com</span>
            <span><h3>Пароль (password):</h3> test@example.com</span>

            <span><h3>Пользователь (user):</h3> test1@example.com</span>
            <span><h3>Пароль (password):</h3> test1@example.com</span>

            <span><Button size='large'><Link to='/login'>Войти</Link></Button></span>
          </Card>
        </Col>
      </Row>
    </div>
    )
  }
}

export default Start = connect(store => ({
  user: store.user
}))(Start)
