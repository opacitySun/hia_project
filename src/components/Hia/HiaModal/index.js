import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import { Modal,Form,Select,Input,Cascader } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ hiaModal,loading }) => ({
  hiaModal,
  loading: loading.models.hiaModal
}))
class HiaModal extends PureComponent {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "hiaModal/findProvince",
    });
    dispatch({
      type: "hiaModal/findArea",
    });
    //归属地
    dispatch({
      type: "hiaModal/findDictBelongTo",
    });
   //医院类型
    dispatch({
      type: "hiaModal/findHospitalType",
    });
    //医院等级
    dispatch({
      type: "hiaModal/findSysHospitalLevel",
    });
    //医院床位范围
    dispatch({
      type: "hiaModal/findSysBedScope",
    });
    //上级单位
    dispatch({
      type: "hiaModal/getParentOrg",
    });
  }

  render() {
    const { hiaModal,modalVisible,parentArguments } = this.props;

    const CreateForm = Form.create({
      mapPropsToFields(props) {
        return {
          orgName: Form.createFormField({
            ...props.orgOnForm.orgName,
            value: props.orgOnForm.orgName
          }),
          address: Form.createFormField({
            ...props.orgOnForm.address,
            value: props.orgOnForm.address
          }),
          parentOrg: Form.createFormField({
            ...props.orgOnForm.parentOrg,
            value: props.orgOnForm.parentOrg
          }),
          areaCode: Form.createFormField({
            ...props.orgOnForm.areaCodeList,
            initialValue: props.orgOnForm.areaCodeList
          }),
          orgType: Form.createFormField({
            ...props.orgOnForm.orgType,
            value: props.orgOnForm.orgType
          }),
          belongToCode: Form.createFormField({
            ...props.orgOnForm.belongToCode,
            value: props.orgOnForm.belongToCode
          }),
          hospTypeCode: Form.createFormField({
            ...props.orgOnForm.hospTypeCode,
            value: props.orgOnForm.hospTypeCode
          }),
          bedScaleCode: Form.createFormField({
            ...props.orgOnForm.bedScaleCode,
            value: props.orgOnForm.bedScaleCode
          }),
          hospGradeCode: Form.createFormField({
          ...props.orgOnForm.hospGradeCode,
          value: props.orgOnForm.hospGradeCode
          }),
          phone: Form.createFormField({
            ...props.orgOnForm.phone,
            value: props.orgOnForm.phone
          }),
          fax: Form.createFormField({
          ...props.orgOnForm.fax,
          value: props.orgOnForm.fax
          }),

        };
      }
    })
    (props => {
      const {
        modalVisible,
        form,
        handleSave,
        handleModalVisible,
        orgOnForm,
        area,
        org,
      } = props;
      const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          form.resetFields();
          handleSave({ ...fieldsValue});
        });
      };

      const dictBelongToOptions = (hiaModal && hiaModal.dictBelongTo && hiaModal.dictBelongTo instanceof Array)?hiaModal.dictBelongTo.map(belong => <Option key={belong.belongToCode}>{belong.belongToName}</Option>):null;
      //医院类型
      const hospitalTypeOptions = (hiaModal && hiaModal.hospitalType && hiaModal.hospitalType instanceof Array)?hiaModal.hospitalType.map(type => <Option key={type.hospTypeCode}>{type.hospTypeName}</Option>):null;
      //医院床位范围
      const sysBedScopeOptions = (hiaModal && hiaModal.sysBedScope && hiaModal.sysBedScope instanceof Array)?hiaModal.sysBedScope.map(bed => <Option key={bed.bedScaleCode}>{bed.bedScaleName}</Option>):null;
      //医院等级
      const hospitalLevelOptions = (hiaModal && hiaModal.hospitalLevel && hiaModal.hospitalLevel instanceof Array)?hiaModal.hospitalLevel.map(level => <Option key={level.hospGradeCode}>{level.hospGradeName}</Option>):null;
      //上级单位
      const parentOrgOptions = (hiaModal && hiaModal.parentOrg && hiaModal.parentOrg instanceof Array)?hiaModal.parentOrg.map(parent => <Option key={parent.orgCode}>{parent.orgName}</Option>):null;
      return (
        <Modal
          title={`${orgOnForm.id ? "修改" : "新建"}用户`}
          visible={modalVisible}
          onOk={okHandle}
          onCancel={() => handleModalVisible()}
        >
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单位名称">
            {form.getFieldDecorator("orgName", {
              rules: [{ required: true, message: "请输入单位名称" }]
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="单位类型">
            {form.getFieldDecorator("orgType", {
              rules: [{ required: true, message: "请输入单位类型" }]
            })(<Select placeholder="选择类型" style={{ width: '100%' }}>
              <Option key="0">医院</Option>
              <Option key="1">政府</Option>
            </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="归属">
            {form.getFieldDecorator("belongToCode", {
            rules: [{ required: true, message: "请输入归属" }]
            })(<Select placeholder="选择归属" style={{ width: '100%' }}>
              {dictBelongToOptions}
            </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="医院类型">
            {form.getFieldDecorator("hospTypeCode", {
              rules: [{ required: true, message: "医院类型" }]
            })(<Select placeholder="医院类型" style={{ width: '100%' }}>
              {hospitalTypeOptions}
            </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="床位范围">
            {form.getFieldDecorator("bedScaleCode", {
              rules: [{ required: true, message: "床位范围" }]
            })(<Select placeholder="床位范围" style={{ width: '100%' }}>
              {sysBedScopeOptions}
            </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="医院等级">
            {form.getFieldDecorator("hospGradeCode", {
              rules: [{ required: true, message: "医院等级" }]
            })(<Select placeholder="医院等级" style={{ width: '100%' }}>
              {hospitalLevelOptions}
            </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级单位">
            {form.getFieldDecorator("parentOrg", {
              rules: [{ required: true, message: "上级单位" }]
            })(<Select placeholder="上级单位" style={{ width: '100%' }}>
              {parentOrgOptions}
            </Select>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="地址">
            {form.getFieldDecorator("address", {
              rules: [{ required: true, message: "请输入地址" }]
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="电话">
            {form.getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入电话" }]
            })(<Input placeholder="请输入电话" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="传真">
            {form.getFieldDecorator("fax", {
              rules: [{ required: true, message: "请输入传真" }]
            })(<Input placeholder="请输入传真" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="区域">
            {form.getFieldDecorator("areaCode",{
              initialValue:orgOnForm.areaCodeList,
              rules: [{ required: true, message: "请输入区域" }]
            })(<Cascader options={area} />)}
          </FormItem>
        </Modal>
      );
    });

    return (
      <Fragment>
        <CreateForm {...parentArguments} area={(hiaModal && hiaModal.area)?hiaModal.area:[]} modalVisible={modalVisible} />
      </Fragment>
    )
  }
}

export default Form.create()(HiaModal);
