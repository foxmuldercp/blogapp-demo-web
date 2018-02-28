import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import { FormattedMessage } from 'react-intl'

import { getCategory, updateCategory } from '../actions/categories'

import { Button, Modal, Form, Input, message } from 'antd'

const FormItem = Form.Item

const  defaultState = {
  name: {
    value: '',
  },
  description: {
    value: '',
  },
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EditForm extends Component {

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    });
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const nameError = isFieldTouched('name') && getFieldError('name');
    const contentError = isFieldTouched('content') && getFieldError('content');

    const fields = (this.props.fields) ? this.props.fields : defaultState
    return (
      <Form {...fields} onSubmit={this.handleSubmit}>
      <FormItem label="Name"
        validateStatus={nameError ? 'error' : ''}
        help={nameError || ''}
      >
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'name is 2 word from 2 alphabets!', pattern: /([A-Za-z0-9]{2,})\ ([A-Za-z0-9]{2,})/i }],
        })(<Input />)}
      </FormItem>
      <FormItem label="description"
        validateStatus={contentError ? 'error' : ''}
        help={contentError || ''}
      >
        {getFieldDecorator('description')(<Input />)}
      </FormItem>
      <FormItem><Button onClick={::this.handleSubmit}
        disabled={hasErrors(getFieldsError())}
      >
        Save</Button>
      </FormItem>
      </Form>
    );
  }
}

let EditView = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value,
      }),
      description: Form.createFormField({
        ...props.description,
        value: props.description.value,
      }),
    }
 },
 onValuesChange(_, values) {
   // console.log('onChange ', values)
 }
})(EditForm)

class CategoryEdit extends Component {

  constructor(props) {
    super(props)
    this.state = { fields: defaultState, modified: false }
  }

  componentDidMount() {
    this.getItems(this.props.params.id)
  }

  getItems(id) {
    this.setState({loading: true})
    this.props.dispatch(getCategory(id))
  }

  componentWillReceiveProps(nextProps) {
    const newItem = {
      name: { value: nextProps.item.name },
        description: { value: nextProps.item.description },
    }
    const newState = {fields: newItem, item: nextProps.item, loading: false}
    this.setState(newState)
  }

  saveData(values) {
    const {dispatch} = this.props
    this.props.dispatch(updateCategory(this.state.item.id, values))
  }

  render() {
    const {dispatch} = this.props
    const fields = (this.state.fields) ? this.state.fields : defaultState
    return <EditView {...fields} onSubmit={::this.saveData} />
  }
}

export default CategoryEdit = connect(store => ({
    user: store.auth, item: store.category
}))(CategoryEdit)
