/**
 * 用户管理
 * 1.用户管理 -- 增删改查
 * 2.用户角色对照管理
 */
import React, { PureComponent } from "react";
import { connect } from "dva";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Icon,
  Button,
  Table,
  Modal
} from "antd";
import styles from "./User.less";

const CheckboxGroup = Checkbox.Group;

const CreateForm = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.userOnForm.name,
        value: props.userOnForm.name
      }),
      username: Form.createFormField({
        ...props.userOnForm.username,
        value: props.userOnForm.username
      }),
      password: Form.createFormField({
        ...props.userOnForm.password,
        value: props.userOnForm.password
      }),
      email: Form.createFormField({
        ...props.userOnForm.email,
        value: props.userOnForm.email
      }),
      mobile: Form.createFormField({
        ...props.userOnForm.mobile,
        value: props.userOnForm.mobile
      })
    };
  }
})(props => {
  const {
    modalVisible,
    form,
    handleSave,
    handleModalVisible,
    handleRoleChecked,
    roleList,
    userOnForm
  } = props;
  const roleIds = userOnForm.roleIds ? userOnForm.roleIds : [];
  // console.log('roleIds : ', roleIds);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSave({ ...fieldsValue, roleIds });
    });
  };

  const roleCheckboxOptions = roleList.map(role => {
    return {
      label: role.name,
      value: role.id
    };
  });
  const checkedHandle = checkedKeys => {
    const filedValues = form.getFieldsValue();
    handleRoleChecked({ ...filedValues, roleIds: checkedKeys });
  };
  return (
    <Modal
      title={`${userOnForm.id ? "修改" : "新建"}用户`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
        {form.getFieldDecorator("name", {
          rules: [{ required: true, message: "请输入用户姓名" }]
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登录名">
        {form.getFieldDecorator("username", {
          rules: [{ required: true, message: "请输入登录名" }]
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
        {
          <CheckboxGroup
            options={roleCheckboxOptions}
            value={roleIds}
            onChange={checkedHandle}
          />
        }
      </FormItem>
    </Modal>
  );
});

const FormItem = Form.Item;
@connect(({ sysUser, loading }) => ({
  sysUser,
  loading: loading.models.sysUser
}))
@Form.create()
export default class SysUser extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    selectedRowKeys: [],
    userOnForm: {}
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "sysUser/fetchUsers"
    });
    dispatch({
      type: "sysUser/fetchRoles"
    });
  }

  // 根据 form 条件查询用户
  handleSearch = () => {};

  /**
   * Table表格勾选changed
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };

  /**
   * Table 点击行事件处理
   * @param record
   */
  handleTableRowClick = record => {
    // console.log('table row clicked :', record);
    // 查询用户信息（包括对应角色）
    this.props.dispatch({
      type: "sysUser/queryUser",
      payload: record.id,
      callback: user => {
        console.log(`查询结果，`, user);

        this.setState({
          // 打开 Modal,设置 Form 信息
          modalVisible: true,
          userOnForm: user
        });
      }
    });
  };

  // 弹出框开关
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      userOnForm: {}
    });
  };

  // 删除
  handleDel = () => {
    const { selectedRows } = this.state;
    // console.log("删除所选项：", selectedRows);
    const delIds = selectedRows.map(item => {
      return item.id;
    });

    this.props.dispatch({
      type: "sysUser/delUsers",
      payload: delIds
    });
  };

  // 保存
  handleSave = formValues => {
    // console.log('Modal 传递的用户信息：', formValues);
    const { userOnForm } = this.state;
    this.props.dispatch({
      type: "sysUser/saveUser",
      payload: {
        id: userOnForm.id,
        name: formValues.name,
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        mobile: formValues.mobile,
        roleIds: formValues.roleIds
      },
      callback: () => {
        // 保存成功后，重置变量
        this.setState({
          modalVisible: false,
          userOnForm: {}
        });
      }
    });
  };

  // Modal 勾选角色
  handleRoleChecked = formValues => {
    // console.log("Modal checked handle， ", formValues);
    const { userOnForm } = this.state;
    this.setState({
      userOnForm: Object.assign({}, userOnForm, formValues)
    });
  };

  renderForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator("no")(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem />
          </Col>
          <Col md={8} sm={24}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const columns = [
      { title: "登录名", dataIndex: "username" },
      { title: "姓名", dataIndex: "name" },
      { title: "邮箱", dataIndex: "email" },
      { title: "电话", dataIndex: "mobile" }
      // { title:'状态', dataIndex:'status'},
    ];

    // console.log('用户管理----------', this.props);

    const {
      sysUser: { userList = [], roleList = [], pagination },
      loading
    } = this.props;
    const { selectedRowKeys, modalVisible, userOnForm } = this.state;
    pagination.total = userList.length;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange
    };

    const parentArguments = {
      handleSave: this.handleSave,
      handleModalVisible: this.handleModalVisible,
      handleRoleChecked: this.handleRoleChecked,
      roleList,
      userOnForm
    };

    return (
      <div>
        <Card bordered={false}>
          <div>{this.renderForm()}</div>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleModalVisible(true)}
              >
                新建
              </Button>
              <Button
                icon="minus"
                type="primary"
                onClick={() => this.handleDel()}
              >
                删除
              </Button>
            </div>

            <Table
              bordered
              rowKey="id"
              loading={loading}
              dataSource={userList}
              columns={columns}
              rowSelection={rowSelection}
              pagination={pagination}
              onRow={record => {
                return {
                  onClick: () => {
                    this.handleTableRowClick(record);
                  } // 点击行
                };
              }}
            />
          </div>
        </Card>
        <CreateForm {...parentArguments} modalVisible={modalVisible} />
      </div>
    );
  }
}
