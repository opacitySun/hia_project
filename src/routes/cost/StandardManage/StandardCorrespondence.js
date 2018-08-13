import React, { Component, Fragment } from 'react';
import {Table} from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import styles from './styles.less';

export default class StandardCorrespondence extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  testChange = (vals) => {
    console.log(vals);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
        width:60
      },
      {
        title: '指标编码',
        dataIndex: 'indexNo',
        key: 'indexNo'
      },
      {
        title: '指标名称',
        dataIndex: 'indexName',
        key: 'indexName'
      },
      {
        title: '标杆指标编码',
        dataIndex: 'standardIndexNo',
        key: 'standardIndexNo',
      },
      {
        title: '标杆指标名称',
        dataIndex: 'standardIndexName',
        key: 'standardIndexName',
      }
    ];
    const data = [];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
    	<Fragment>
        <FilterGroup
          onChange={this.testChange}
          rowTypes={['versionNumber','indexClassification','index']}
        />
        <div className={styles.modalTable}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
      </Fragment>
    )
  }
}
