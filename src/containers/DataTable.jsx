import React, {Component} from 'react'
import {connect} from 'react-redux'

import { LocaleProvider, Row, Col, Card, Table, Pagination } from 'antd'
import { FormattedMessage } from 'react-intl'

import enUS from 'antd/lib/locale-provider/en_US'
import ruRU from 'antd/lib/locale-provider/ru_RU'

const pagination = {showSizeChanger: true, showQuickJumper:true, pageSizeOptions: [10, 20, 50, 100]}

class DataTable extends Component {
  render(){
    return(
      <Row>
        <Col>
          <Card title={this.props.title} extra={this.props.extra}>
            <div>{(this.props.controls) ? this.props.controls : '' }</div>
            <LocaleProvider locale={ruRU}>
              {(this.props.items.length > 0) ?
                <Table rowKey={record => record.id} dataSource={this.props.items} size='small'
                  pagination={(this.props.items.length > 10) ? pagination : false}
                  loading={this.props.loading} columns={this.props.columns}
                  expandedRowRender={this.props.expanded}
                  rowSelection={this.props.rowSelection} footer={this.props.footer}/>
              :
                <h1><center><FormattedMessage id='data.loading' /></center></h1>
              }
            </LocaleProvider>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default DataTable = connect()(DataTable)
