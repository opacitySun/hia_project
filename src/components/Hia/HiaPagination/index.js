import React, { PureComponent,Fragment } from 'react';
import { Pagination } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

class HiaPagination extends PureComponent {
  state = {
    pageNum:1,
    pageSize:10
  };

  onChange = (page) => {
    const { onChange } = this.props;
    this.setState({
      pageNum:page
    });
    if (onChange) {
      onChange(page,this.state.pageSize);
    }
  }

  onShowSizeChange = (current, size) => {
    const { onChange } = this.props;
    this.setState({
      pageSize:size
    });
    if (onChange) {
      onChange(current,size);
    }
  }

  render() {
    const { total } = this.props;

    return (
      <Fragment>
        <Pagination
          current={this.state.pageNum}
          onChange={this.onChange}
          total={total}
          showSizeChanger
          onShowSizeChange={this.onShowSizeChange}
          showTotal={(total, range) => `总计${total}条`}
        />
      </Fragment>
    )
  }
}

export default HiaPagination;
