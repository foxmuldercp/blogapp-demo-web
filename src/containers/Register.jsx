import React, {Component} from 'react'
let createReactClass = require('create-react-class')

import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import {signIn} from '../actions/auth'

import { Row, Col, Card, Button, Form, Input, message, Checkbox } from 'antd'
const createForm = Form.create
const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
}

let Register = createReactClass({

  getInitialState() {
    return {
      name: '', email: '', password: '', password_confirmation: ''
    }
  },

  componentDidMount(){
    if (this.props.user.email) {
      this.props.dispatch(push('/'))
    }
  },

  doneRegisterForm(e) {
    e.preventDefault()
    let user_data = this.props.form.getFieldsValue(['email', 'password', 'password_confirmation'])
    const formData = {'user': user_data}
    this.props.dispatch(signIn(formData))
  },

  render() {
    const { current, private_person } = this.state
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    }

    return (
      <Row style={{ padding: '20px' }}>
        <Col lg={{ span: 16, offset: 4 }}>
          <Card title={<center><h3>Register, please</h3></center>}>
      <Form horizontal onSubmit={this.doneRegisterForm} >
        <FormItem {...formItemLayout} label="email">
          {getFieldDecorator('email', { rules: [{ required: true, message: 'Please input email!' }],
            initialValue: '' })(
            <Input type="email" placeholder="Please, input your email" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator('password', { initialValue: '' })(
          <Input type="password" placeholder="Please input the password" required={true} />
        )}
        </FormItem>
        <FormItem {...formItemLayout} label="Password confirmation">
          {getFieldDecorator('password_confirmation', { initialValue: '' })(
            <Input type="password" placeholder="Please input the password" required={true} />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit">Register</Button>
      </Form>
          </Card>
        </Col>
      </Row>
    )
  }
})

Register = createForm()(Register)

export default Register = connect(store => ({
  user: store.auth
}))(Register)
