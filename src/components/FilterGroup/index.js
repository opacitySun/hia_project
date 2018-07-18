import React from 'react';
import { Select, DatePicker } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.less';

class FilterGroup extends Component {
  static defaultProps = {
    resultArr: [],
    onSelect: () => {}
  };
  static propTypes = {
    resultArr: PropTypes.array,
    onSelect: PropTypes.func
  };
  static childContextTypes = {
    setFilterType: PropTypes.func
  };
  state = {
    //筛选类型
    filterType:[]
  };
  getChildContext() {
    return {
      setFilterType: types => {
        this.setState({
          filterType: types
        });
      }
    };
  }

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
      {
        this.filterType.dateSelect ? (
          <div class="filter-line">
            <span class="label">日期：</span>
            <select class="filter-list-select">
              <option value="0" data-ulnum="0">年</option>
              <option value="1" data-ulnum="1">半年</option>
              <option value="2" data-ulnum="2">季度</option>
              <option value="3" data-ulnum="3">月</option>
            </select>
            <ul class="filter-list filter-list-0">
              <li data-uuid="0" data-ulnum="0">2018年</li>
              <li data-uuid="1" data-ulnum="0">2017年</li>
            </ul>
            <ul class="filter-list filter-list-1">
              <li data-uuid="0" data-ulnum="1">上半年</li>
              <li data-uuid="1" data-ulnum="1">下半年</li>
            </ul>
            <ul class="filter-list filter-list-2">
              <li data-uuid="0" data-ulnum="2">1季度</li>
              <li data-uuid="1" data-ulnum="2">2季度</li>
              <li data-uuid="2" data-ulnum="2">3季度</li>
              <li data-uuid="3" data-ulnum="2">4季度</li>
            </ul>
            <ul class="filter-list filter-list-3">
              <li data-uuid="0" data-ulnum="3">1月</li>
              <li data-uuid="1" data-ulnum="3">2月</li>
              <li data-uuid="2" data-ulnum="3">3月</li>
              <li data-uuid="3" data-ulnum="3">4月</li>
              <li data-uuid="4" data-ulnum="3">5月</li>
              <li data-uuid="5" data-ulnum="3">6月</li>
              <li data-uuid="6" data-ulnum="3">7月</li>
              <li data-uuid="7" data-ulnum="3">8月</li>
              <li data-uuid="8" data-ulnum="3">9月</li>
              <li data-uuid="9" data-ulnum="3">10月</li>
              <li data-uuid="10" data-ulnum="3">11月</li>
              <li data-uuid="11" data-ulnum="3">12月</li>
            </ul>
          </div>
        ) : null
      }
    </div>
  );
}

export default FilterGroup;
