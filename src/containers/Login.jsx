import React, {Component} from 'react'
let createReactClass = require('create-react-class');

import {Link} from 'react-router'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {logIn} from '../actions/auth'

import { Row, Col, Card, Button, Form, Input, message, Checkbox, Icon } from 'antd'
const createForm = Form.create
const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
}

let Login = createReactClass({

  componentDidMount(){
    if (this.props.user.email) {
      this.props.dispatch(push('/'))
    }
  },

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(logIn(this.props.form.getFieldsValue()))
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{ padding: '20px' }}>
        <Col lg={{ span: 12, offset: 6 }}>
          <Card title={<center><h3>Sign in, please</h3></center>}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('email', {rules: [{ required: true, 
                  message: 'Please input your username!' }],})(
                    <Input type='email' addonBefore={<Icon type="user" />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {rules: [{ required: true, 
                  message: 'Please input your Password!' }],})(
                  <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {valuePropName: 'checked', initialValue: true,})(
                  <Checkbox>Remember me</Checkbox>
                )}
              </FormItem>
              <FormItem style={{ marginTop: 24 }}>
                <center>
                  <Button type="primary" htmlType="submit">Log in</Button>
                </center>
              </FormItem>
            </Form>
            <center>
              <Link to='/register'>Register now</Link>  |  <Link to='/lost'>I lost my password</Link>
            </center>
          </Card>
        </Col>
      </Row>
    );
  }
})

Login = createForm()(Login)

export default Login = connect(store => ({
  user: store.auth
}))(Login)
