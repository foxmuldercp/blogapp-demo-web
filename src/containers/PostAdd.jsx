import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import { FormattedMessage } from 'react-intl'

import { postAdd } from '../actions/posts'
import { categoriesGet } from '../actions/categories'

import { Button, Modal, Form, Input, Select, message } from 'antd'
const FormItem = Form.Item

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, categories} = props
    const { getFieldDecorator } = form
    const category_list = (categories.length > 0) ? categories.map(item => <Option key={item.id}>{item.name}</Option>) : []
    return (
      <Modal
        visible={visible}
        title={<FormattedMessage id='common.add' />}
        okText={<FormattedMessage id='common.add' />}
        cancelText={<FormattedMessage id='common.cancel' />}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label={<FormattedMessage id='common.name' />}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'name is 2 word from 2 alphabets!', pattern: /([A-Za-z0-9]{2,})\ ([A-Za-z0-9]{2,})/i }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label={(category_list.length > 0) ? <FormattedMessage id='category' /> :
              <FormattedMessage id='data.loading' />}>
            {getFieldDecorator('category_id', {
              rules: [{ required: true, message: 'Please select Category!' }], initialValue: '' })(
              <Select
                value=''
                disabled={category_list.length == 0}
                placeholder='Select Category'
                notFoundContent=''
                defaultActiveFirstOption=''
              >
              {category_list}
            </Select>
          )}
        </FormItem>
          <FormItem label={<FormattedMessage id='post.content' />}>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input the post content!' }],
            })(
              <Input.TextArea />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class PostAdd extends React.Component {

  state = {
    visible: false,
    categories: [],
    post: this.props.post
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  componentDidMount(){
    if (this.state.categories.length == 0) {
      this.props.dispatch(categoriesGet())
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {categories: nextProps.categories.items, post: nextProps.post, loading: false}
    this.setState(newState)
  }

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.props.dispatch(postAdd(values))
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    const categories = (this.state.categories) ? this.state.categories : []
    return (
      <div>
        <Button type="primary" onClick={this.showModal}><FormattedMessage id='post.add' /></Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          categories={categories}
          post={this.state.post}
        />
      </div>
    );
  }
}

export default PostAdd = connect(store => ({
  user: store.user, categories: store.categories
}))(PostAdd)
