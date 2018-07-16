import React from 'react';

import {Col, Input, Row, Select} from 'antd';

const Option = Select.Option;


class EditableCellInput extends React.PureComponent {


  render() {
    const {editable, value, onChange} = this.props;
    return (
      <div>
        {editable ?
          <Input style={{margin: '-5px,0'}} value={value} onChange={e => onChange(e.target.value)}/>
          : value
        }
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class EditableCellSelect extends React.PureComponent {


  render() {
    const {editable, value, options, mappedOptions, onChange} = this.props;
    let {decodeVal, decodeDisplay} = this.props;
    if (decodeVal === undefined) {
      decodeVal = 'codeId';
    }
    if (decodeDisplay === undefined) {
      decodeDisplay = 'codeName';
    }
    if (editable) {
      return (
        <div>
          {<Select className="editable-cell-select" onChange={val => onChange(val)} disabled={!editable} value={value}>
            {
              options.map((item) => {
                return (<Option
                  key={item[decodeVal]} value={item[decodeVal]} disabled={item.disable}
                >
                  {item[decodeDisplay]}</Option>);
              })
            }
          </Select>}
        </div>
      );
    } else if (mappedOptions !== undefined && mappedOptions !== {}) {
      if (typeof mappedOptions[value] === 'object') {
        return <div>{mappedOptions[value][decodeDisplay]}</div>;
      } else {
        return <div>{mappedOptions[value]}</div>;
      }
    } else if (options && options.length > 0) {
      const filter = options.filter(item => item[decodeVal] === value);
      if (filter.length > 0) {
        return <div>{filter[0][decodeDisplay]}</div>;
      }
    }
    return null;
  }
}

// 目前仅用于模版表配置中的一个选择框
// eslint-disable-next-line react/no-multi-comp
class EditableCellSelectTwoValue extends React.PureComponent {

  render() {
    const {editable, value, options, mappedOptions, onChange, dataSource} = this.props;
    let {decodeVal, decodeDisplay, decodeDisplayName} = this.props;
    if (decodeVal === undefined) {
      decodeVal = 'codeId';
    }
    if (decodeDisplay === undefined) {
      decodeDisplay = 'codeName';
    }
    if (decodeDisplayName === undefined) {
      decodeDisplayName = 'templateName';
    }
    if (editable) {
      return (
        <div>
          {<Select className="editable-cell-select" onChange={val => onChange(val)} disabled={!editable} value={value}>
            {
              options.map((item) => {
                let name = '##default';
                const nameDatas = dataSource
                  .filter(data => data[decodeDisplay] === item[decodeDisplay]);
                if (nameDatas && nameDatas.length > 0) {
                  name = nameDatas[0][decodeDisplayName];
                }
                name = name === '##default' ? (item[decodeDisplayName] === '##default' ? '' : item[decodeDisplayName]) : name;
                return (<Option
                  key={item[decodeVal]} value={item[decodeVal]} disabled={item.disable}
                >{
                  <Row gutter={24}>
                    <Col span={14}>{item[decodeDisplay]}</Col>
                    <Col span={10}>{name}</Col>
                  </Row>
                }</Option>);
              })
            }
          </Select>}
        </div>
      );
    } else if (mappedOptions !== undefined && mappedOptions !== {}) {
      if (typeof mappedOptions[value] === 'object') {
        return <div>{mappedOptions[value][decodeDisplay]}</div>;
      } else {
        return <div>{mappedOptions[value]}</div>;
      }
    } else if (options && options.length > 0) {
      const filter = options.filter(item => item[decodeVal] === value);
      if (filter.length > 0) {
        return <div>{filter[0][decodeDisplay]}</div>;
      }
    }
    return null;
  }
}

export {EditableCellInput, EditableCellSelect, EditableCellSelectTwoValue};
