import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import { FormattedMessage } from 'react-intl'

import { commentAdd } from '../actions/comments'

import { Button, Modal, Form, Input, message } from 'antd'
const FormItem = Form.Item

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, categories} = props
    const { getFieldDecorator } = form
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
            {getFieldDecorator('author', {
              rules: [{ required: true , message: 'name is 2 word from 2 alphabets!', pattern: /([A-Za-z0-9]{2,})\ ([A-Za-z0-9]{2,})/i }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label={<FormattedMessage id='content' />}>
            {getFieldDecorator('content')(
              <Input.TextArea />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class CommentAdd extends React.Component {

  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }


  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch(commentAdd(this.props.post.id, values))
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  componentWillReceiveProps(nextProps) {
    const newState = {post: nextProps.post}
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}><FormattedMessage id='common.add' /></Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CommentAdd = connect()(CommentAdd)
