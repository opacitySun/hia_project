import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Button} from 'antd';
import FilterGroup from 'components/Hia/FilterGroup';
import HiaPagination from 'components/Hia/HiaPagination';
import styles from './styles.less';

@connect(({ standardManage, loading }) => ({
  standardManage,
  loading: loading.models.standardManage
}))
export default class StandardCorrespondence extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  filterChange = (vals) => {
    console.log(vals);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  paginationChange = (pageNum,pageSize) => {
    console.log(pageNum,pageSize);
  }
  componentWillMount() {
    // 查询table
    const { dispatch } = this.props;
    dispatch({
      type: 'standardManage/queryCorrespondence',
      payload: this.state.selectedRowKeys,
    });
  }
  componentWillMountpp() {
    // 自动匹配
    const { dispatch } = this.props;
    dispatch({
      type: 'standardManage/queryCorrespondencepp',
      payload: this.state.selectedRowKeys,
    });
  }
  // 保存
  saveIndex =() => {
    const {standardManage} = this.state;
    console.log('saveIndex',standardManage)
    if(standardManage.length === 0){
      message.warn('没有修改数据，无需保存！');
    }else{
      this.props.dispatch({
        type: 'standardManage/queryCorrespondencebc',
        payload: {
          standardManage,
        },
        callback: response => {
          console.log('callback',response)
          if(response.code === 1){
            this.setState({standardManage:[]})
            message.success(response.msg)
          }else{
            message.error(response.msg);
          }
        },
      });
    }
  };
  render() {
    const { standardManage } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'pkId',
        key: 'pkId',
        width:60
      },
      {
        title: '指标编码',
        dataIndex: 'customIndexCode',
        key: 'customIndexCode'
      },
      {
        title: '指标名称',
        dataIndex: 'customIndexName',
        key: 'customIndexName'
      },
      {
        title: '标杆指标编码',
        dataIndex: 'dictIndexCode',
        key: 'dictIndexCode',
      },
      {
        title: '标杆指标名称',
        dataIndex: 'dictIndexName',
        key: 'dictIndexName',
      }
    ];
    const data = standardManage.correspondenceData?standardManage.correspondenceData:[];
    const { loading, selectedRowKeys } = this.state;
    console.log('correspondenceData');
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
    	<Fragment>
        <FilterGroup
          onChange={this.filterChange}
          rowTypes={['indexName','index']}
        />
        <div className={styles.modalTable}>
        	<Button type="primary" className={styles['spacing']} onClick={this.saveIndex}>保存</Button>
        	<Button type="primary" className={styles['spacing']}>自动匹配</Button>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
          <HiaPagination total={1} onChange={this.paginationChange} />
        </div>
      </Fragment>
    )
  }
}
