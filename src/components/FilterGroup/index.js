import React, { PureComponent } from 'react';
import { Select, DatePicker } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.less';

class FilterGroup extends PureComponent {

  render() {
    const Option = Select.Option;
    return (
      <div>
        <div className="filter-line">
          <span className="label">筛选结果：</span>
          <ul className="filter-result"></ul>
          <a href="javascript:void(0)" className="filter-clear">
            <i className="fa fa-eraser"></i>
            <span>清除条件</span>
          </a>
        </div>

      </div>
    )
  }
}

export default FilterGroup;
