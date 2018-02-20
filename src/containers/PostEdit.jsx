import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import { FormattedMessage } from 'react-intl'

import { getPost, updatePost } from '../actions/posts'

import {getCategories} from '../actions/categories'

import { Button, Modal, Form, Input, Select, message } from 'antd'

const FormItem = Form.Item

const  defaultState = {
  name: {
    value: '',
  },
  content: {
    value: '',
  },
  category_id: {
    value: ''
  }
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PostEditForm extends Component {

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
    const categoryError = isFieldTouched('category_id') && getFieldError('category_id');

    const fields = (this.props.fields) ? this.props.fields : defaultState

    const category_list = (this.props.categories) ? this.props.categories.map(item => <Option key={item.id}>{item.name}</Option>) : []

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
          <FormItem label={(category_list.length > 0) ? <FormattedMessage id='category' /> :
              <FormattedMessage id='common.loading' />}>
            {getFieldDecorator('category_id')(
              <Select
                value=''
                placeholder='Select Category'
                notFoundContent=''
                defaultActiveFirstOption=''
              >
              {category_list}
            </Select>
          )}
        </FormItem>
      <FormItem label="content"
        validateStatus={contentError ? 'error' : ''}
        help={contentError || ''}
      >
        {getFieldDecorator('content')(<Input.TextArea />)}
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

let PostEditView = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.name,
        value: props.name.value,
      }),
      content: Form.createFormField({
        ...props.content,
        value: props.content.value,
      }),
      category_id: Form.createFormField({
        ...props.category_id,
        value: props.category_id.value,
      }),
    }
 },
 onValuesChange(_, values) {
   // console.log('onChange ', values)
 }
})(PostEditForm)

class PostEdit extends Component {

  constructor(props) {
    super(props)
    this.state = { fields: defaultState, item: null, categories: [] }
  }

  componentDidMount() {
    this.getItems()
  }

  getItems() {
    this.setState({loading: true})
    this.props.dispatch(getCategories())
    this.props.dispatch(getPost(this.props.params.id))
  }

  setFields(item) {
    let newItem = defaultState
    if (item.name) {
    const category = (item.category) ? item.category.name : ''
      newItem = {
        name: { value: item.name },
        content: { value: item.content },
        category_id: { value: category },
      }
    }
    return newItem
  }
  componentWillReceiveProps(nextProps) {
    let { item, fields, categories } = this.state
    categories = (categories != nextProps.categories) ? nextProps.categories : categories
    item = (nextProps.item) ? nextProps.item : null
    fields = (item) ? this.setFields(item) : defaultState
    const newState = {item: item, fields: fields, categories: categories, loading: false}
    this.setState(newState)
  }

  saveData(values) {
    this.props.dispatch(updatePost(this.state.item.id, values))
  }

  render() {
    const { fields, categories } = this.state
    return <PostEditView {...fields} onSubmit={::this.saveData} categories={categories}/>
  }
}

//

export default PostEdit = connect(store => ({
    user: store.user, categories: store.categories, item: store.post
}))(PostEdit)
