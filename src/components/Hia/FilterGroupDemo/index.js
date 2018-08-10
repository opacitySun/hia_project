import React, { PureComponent } from 'react';
import { Select } from 'antd';
import styles from './index.less';
import * as timeData from './mock.js';

const { Option } = Select;

export default class FilterGroupDemo extends PureComponent {
  state = {
    dateType: undefined,// 日期类型
    hospitalType: undefined, // 医院类型

  };

  changeDateType = (value) => {
    console.log('date type');
    console.log(value);
    this.setState({
      dateType: value,
    });
  };

  changeHospitalType = (value)=>{
    console.log('hospital Type');
    console.log(value);
    this.setState({
      hospitalType: value,
    });
  }

  renderDateList = () => {
    return (
      <ul className={styles['filter-list']}>
        {timeData.timeSelect.data[this.state.dateType].map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>
    );
  };

  render() {
    return (
      <div className={styles['msp-filter']} data-filternum="0">
        <div className={styles['filter-line']}>
          <span className={styles.label}>筛选结果：</span>
          <ul className={styles['filter-result']}/>
          <a href="javascript:void(0)" className={styles['filter-clear']}>
            <i className={`${styles.fa} ${styles['fa-eraser']}`}/>
            <span>清除条件</span>
          </a>
        </div>
        <div className={styles['filter-line']}>
          <span className={styles.label}><i>*</i>日期：</span>
          <Select placeholder="请选择" className={styles.filterGroupSelect} onChange={this.changeDateType}>
            {timeData.timeSelect.type.map(item => {
              return (<Option key={item.value} value={item.value}>{item.name}</Option>);
            })}
          </Select>
          {
            this.state.dateType && this.renderDateList()
          }
        </div>
        <div className={styles['filter-line']}>
          <span className={styles.label}>区域：</span>
          <ul className={styles['filter-list']}>
            <li data-uuid="-1">北京：</li>
            <li data-uuid="0" data-ulnum="4">朝阳区</li>
            <li data-uuid="1" data-ulnum="4">海淀区</li>
            <li data-uuid="2" data-ulnum="4">西城区</li>
            <li data-uuid="3" data-ulnum="4">东城区</li>
            <li data-uuid="4" data-ulnum="4">崇文区</li>
            <li data-uuid="5" data-ulnum="4">宣武区</li>
            <li data-uuid="6" data-ulnum="4">丰台区</li>
            <li data-uuid="7" data-ulnum="4">石景山区</li>
            <li data-uuid="8" data-ulnum="4">门头沟</li>
            <li data-uuid="9" data-ulnum="4">房山区</li>
            <li data-uuid="10" data-ulnum="4">通州区</li>
            <li data-uuid="11" data-ulnum="4">大兴区</li>
            <li data-uuid="12" data-ulnum="4">顺义区</li>
            <li data-uuid="13" data-ulnum="4">怀柔区</li>
            <li data-uuid="14" data-ulnum="4">密云区</li>
            <li data-uuid="15" data-ulnum="4">昌平区</li>
            <li data-uuid="16" data-ulnum="4">平谷区</li>
            <li data-uuid="17" data-ulnum="4">延庆县</li>
          </ul>
        </div>
        <div className={`${styles['filter-line']} ${styles['filter-select']}`}>
          <span className={styles.label}>医疗机构：</span>
          <select data-ulnum="s1">
            <option value="-2">医院类型：</option>
            <option value="0">综合医院</option>
            <option value="1">中医医院</option>
            <option value="2">中西医结合医院</option>
            <option value="3">民族医院</option>
            <option value="4">专科医院</option>
            <option value="5">口腔医院</option>
            <option value="6">眼科医院</option>
            <option value="7">耳鼻喉科医院</option>
            <option value="8">肿瘤医院</option>
            <option value="9">心血管病医院</option>
            <option value="10">胸科医院</option>
            <option value="11">血液病医院</option>
            <option value="12">妇产（科）医院</option>
            <option value="13">儿童医院</option>
            <option value="14">精神病医院</option>
            <option value="15">传染病医院</option>
            <option value="16">皮肤病医院</option>
            <option value="17">结核病医院</option>
            <option value="18">麻风病医院</option>
            <option value="19">职业病医院</option>
            <option value="20">骨科医院</option>
            <option value="21">康复医院</option>
            <option value="22">整形外科医院</option>
            <option value="23">美容医院</option>
            <option value="24">其他专科医院</option>
            <option value="25">护理院</option>
          </select>
          <select data-ulnum="s2">
            <option value="-1">床位范围：全部</option>
            <option value="0">1500及以上</option>
            <option value="1">1000（含）-1500</option>
            <option value="2">500（含）-1000</option>
            <option value="3">500以下</option>
          </select>
          <select data-ulnum="s3">
            <option value="-1">医院等级：全部</option>
            <option value="0">三级甲等</option>
            <option value="1">三级乙等</option>
            <option value="2">二级甲等</option>
            <option value="3">二级乙等</option>
          </select>
          <select data-ulnum="s4">
            <option value="-1">所属：全部</option>
            <option value="0">部署医院</option>
            <option value="1">省（直辖市）级医院</option>
            <option value="2">地级市医院</option>
            <option value="3">县级医院</option>
          </select>
          <select data-ulnum="s5">
            <option value="-1">医院：全部</option>
            <option value="0">广东省中医院</option>
            <option value="1">北京中日医院</option>
            <option value="2">北京同仁医院</option>
            <option value="3">上海中医医院</option>
            <option value="4">深圳附属医院</option>
            <option value="5">广东省中医院</option>
            <option value="6">北京中日医院</option>
            <option value="7">北京同仁医院</option>
            <option value="8">上海中医医院</option>
          </select>
        </div>
      </div>
    );
  }
}
