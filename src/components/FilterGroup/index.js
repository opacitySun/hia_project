import React, { PureComponent } from 'react';
import { Row, Col, Form, Card, Select, List, DatePicker } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TagSelect from 'components/TagSelect';
import AvatarList from 'components/AvatarList';
import Ellipsis from 'components/Ellipsis';
import StandardFormRow from 'components/StandardFormRow';

import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

class FilterGroup extends PureComponent {
  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields(err => {
        if (!err) {
          // eslint-disable-next-line
          dispatch({
            type: 'list/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  }

  render() {
    const { rowTypes } = this.props;
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const timeSelectJsonData = [
      {
        "name":"年",
        "value":"timeSelect1"
      },
      {
        "name":"半年",
        "value":"timeSelect2"
      },
      {
        "name":"季度",
        "value":"timeSelect3"
      },
      {
        "name":"月",
        "value":"timeSelect4"
      }
    ];
    const timeSelectData = timeSelectJsonData.map(function(_item){
      return (
        <Option value={_item.value}>{_item.name}</Option>
      )
    });

    const regionJsonData = [
      {
        "name":"朝阳区",
        "value":"region1"
      },
      {
        "name":"海淀区",
        "value":"region2"
      },
      {
        "name":"西城区",
        "value":"region3"
      },
      {
        "name":"东城区",
        "value":"region4"
      },
      {
        "name":"崇文区",
        "value":"region5"
      },
      {
        "name":"宣武区",
        "value":"region6"
      },
      {
        "name":"丰台区",
        "value":"region7"
      },
      {
        "name":"石景山区",
        "value":"region8"
      },
      {
        "name":"门头沟",
        "value":"region9"
      },
      {
        "name":"房山区",
        "value":"region10"
      },
      {
        "name":"通州区",
        "value":"region11"
      },
      {
        "name":"大兴区",
        "value":"region12"
      },
      {
        "name":"顺义区",
        "value":"region13"
      },
      {
        "name":"怀柔区",
        "value":"region14"
      },
      {
        "name":"密云区",
        "value":"region15"
      },
      {
        "name":"昌平区",
        "value":"region16"
      },
      {
        "name":"平谷区",
        "value":"region17"
      },
      {
        "name":"延庆县",
        "value":"region18"
      }
    ];
    const regionData = regionJsonData.map(function(_item){
      return (
        <TagSelect.Option value={_item.value}>{_item.name}</TagSelect.Option>
      )
    });

    const hospitalTypeJsonData = [
      {
        "name":"综合医院",
        "value":"hospitalType1"
      },
      {
        "name":"中医医院",
        "value":"hospitalType2"
      },
      {
        "name":"中西医结合医院",
        "value":"hospitalType3"
      },
      {
        "name":"民族医院",
        "value":"hospitalType4"
      },
      {
        "name":"专科医院",
        "value":"hospitalType5"
      },
      {
        "name":"口腔医院",
        "value":"hospitalType6"
      },
      {
        "name":"眼科医院",
        "value":"hospitalType7"
      },
      {
        "name":"耳鼻喉科医院",
        "value":"hospitalType8"
      },
      {
        "name":"肿瘤医院",
        "value":"hospitalType9"
      },
      {
        "name":"心血管病医院",
        "value":"hospitalType10"
      },
      {
        "name":"胸科医院",
        "value":"hospitalType11"
      },
      {
        "name":"血液病医院",
        "value":"hospitalType12"
      },
      {
        "name":"妇产（科）医院",
        "value":"hospitalType13"
      },
      {
        "name":"儿童医院",
        "value":"hospitalType14"
      },
      {
        "name":"精神病医院",
        "value":"hospitalType15"
      },
      {
        "name":"传染病医院",
        "value":"hospitalType16"
      },
      {
        "name":"皮肤病医院",
        "value":"hospitalType17"
      },
      {
        "name":"结核病医院",
        "value":"hospitalType18"
      },
      {
        "name":"麻风病医院",
        "value":"hospitalType19"
      },
      {
        "name":"职业病医院",
        "value":"hospitalType20"
      },
      {
        "name":"骨科医院",
        "value":"hospitalType21"
      },
      {
        "name":"康复医院",
        "value":"hospitalType22"
      },
      {
        "name":"整形外科医院",
        "value":"hospitalType23"
      },
      {
        "name":"美容医院",
        "value":"hospitalType24"
      },
      {
        "name":"其他专科医院",
        "value":"hospitalType25"
      },
      {
        "name":"护理院",
        "value":"hospitalType26"
      }
    ];
    const hospitalTypeData = hospitalTypeJsonData.map(function(_item){
      return (
        <TagSelect.Option value={_item.value}>{_item.name}</TagSelect.Option>
      )
    });
    const bedRangeJsonData = [
      {
        "name":"1500及以上",
        "value":"bedRange1"
      },
      {
        "name":"1000（含）-1500",
        "value":"bedRange2"
      },
      {
        "name":"500（含）-1000",
        "value":"bedRange3"
      },
      {
        "name":"500以下",
        "value":"bedRange4"
      }
    ];
    const bedRangeData = bedRangeJsonData.map(function(_item){
      return (
        <Option value={_item.value}>{_item.name}</Option>
      )
    });
    const medicalInstitution =
    <Row gutter={16}>
      <Col lg={8} md={10} sm={10} xs={24}>
        <FormItem {...formItemLayout} label="医院类型">
            <Select
              onChange={this.handleFormSubmit}
              placeholder="不限"
              style={{ maxWidth: 200, width: '100%' }}
            >
              {hospitalTypeData}
            </Select>
        </FormItem>
      </Col>
      <Col lg={8} md={10} sm={10} xs={24}>
        <FormItem {...formItemLayout} label="床位范围">
            <Select
              onChange={this.handleFormSubmit}
              placeholder="不限"
              style={{ maxWidth: 200, width: '100%' }}
            >
              {bedRangeData}
            </Select>
        </FormItem>
      </Col>
    </Row>;

    return (
      <div>
        <Card bordered={false}>
          <Form layout="inline">
            {(rowTypes.indexOf("timeSelect") > -1)?
              <StandardFormRow title="日期">
                <Row gutter={16}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout}>
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="不限"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          {timeSelectData}
                        </Select>
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            :null}
            {(rowTypes.indexOf("region") > -1)?
              <StandardFormRow title="区域" block style={{ paddingBottom: 11 }}>
                <FormItem>
                    <TagSelect onChange={this.handleFormSubmit} expandable>
                      {regionData}
                    </TagSelect>
                </FormItem>
              </StandardFormRow>
            :null}
            {(rowTypes.indexOf("medicalInstitution") > -1)?
              <StandardFormRow title="医疗机构" grid last>
                {medicalInstitution}
              </StandardFormRow>
            :null}
          </Form>
        </Card>
      </div>
    )
  }
}

export default FilterGroup;
