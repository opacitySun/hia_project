/**
 * 系统角色管理
 * 1. 角色数据的维护（增删改查）
 * 2. 角色与菜单的维护
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Modal,
  Tree,
} from 'antd';
import { VHArray } from '../../../utils/utils';
import styles from './Role.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

// 新增/维护角色 【Modal】
const CreateForm = Form.create({
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.formValues.name,
        value: props.formValues.name,
      }),
      remark: Form.createFormField({
        ...props.formValues.remark,
        value: props.formValues.remark,
      }),
    };
  },
})(props => {
  const { modalVisible, form, handleSubmit, handleModalVisible, handleFormValuesChanged, treeData, formValues } = props;
  const menuIds = formValues.menuIds ? [...formValues.menuIds] : [];

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      // console.log('fields value :', fieldsValue, menuIds);
      handleSubmit({...fieldsValue, menuIds});
    });
  };


  // console.log('Modal props : ', props);

  const handleTreeCheck = (checkedKeys) => {
    const fieldsValue = form.getFieldsValue();

    handleFormValuesChanged({menuIds: checkedKeys, ...fieldsValue});
  };

  // 根据树结构数据生成节点标签
  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id}>
            { renderTreeNodes(item.children) }
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} />;
    });
  };

  return (
    <Modal
      title="新建/修改角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入角色名称' }],
        })(<Input />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('remark')(<Input />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单">
        <Tree checkable onCheck={handleTreeCheck} checkedKeys={menuIds}>
          { renderTreeNodes(treeData) }
        </Tree>
      </FormItem>
    </Modal>
  );
});

@connect(({ sysUser, loading }) => {
  return {
    sysUser,
    loading: loading.models.sysUser,
  }
})
// @Form.create()
export default class Role extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    selectedRowKeys: [],
    roleOnForm: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;

    // 初始化页面，查询系统角色信息、菜单信息、角色和菜单对照信息
    dispatch({
      type: 'sysUser/initData',
    });
  }

  /**
   * Table表格勾选changed
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log('Table row select change: ', selectedRowKeys, selectedRows);
    this.setState({
      selectedRowKeys,
      selectedRows,
    })
  };

  /**
   * Table 点击行事件处理
   * @param record
   */
  handleTableRowClick = record => {
    // console.log('table row clicked :', record);
    // 查询角色对应菜单
    this.props.dispatch({
      type: 'sysUser/queryRole',
      payload: record.id,
      callback: role => {
        // console.log(`查询结果，`, role);

        this.setState({ // 打开 Modal,设置 Form 信息
          modalVisible: true,
          roleOnForm: role,
        })
      },
    });
  };

  // 弹出框开关
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
      roleOnForm: {},
    });
  };

  // 删除
  handleDel = () => {
    const { selectedRows } = this.state;
    // console.log("删除所选项：", selectedRows);
    const delIds = selectedRows.map((item) => {
      return item.id;
    });

    this.props.dispatch({
      type: 'sysUser/delRoles',
      payload: delIds,
    });

  };


  // 添加 （Modal 按钮）
  handleSubmit = fields => {
    const { roleOnForm } = this.state;
    this.props.dispatch({
      type: 'sysUser/saveRole',
      payload: {
        id: roleOnForm.id,
        name: fields.name,
        remark: fields.remark,
        createdBy: 'admin',
        createdDate: new Date().getTime(),
        menuIds: fields.menuIds,
      },
    });

    this.setState({
      modalVisible: false,
    });
  };

  /**
   * Modal 中 菜单树 checked
   * @param fieldsValue -- Modal 中绑定的信息
   */
  handleFormValuesChanged = (fieldsValue) => {
    // console.log('handle tree checked: ', fieldsValue);
    const { roleOnForm } = this.state;
    this.setState({
      roleOnForm: Object.assign({}, roleOnForm, fieldsValue),
    })
  };


  render() {
    const { sysUser: { roleList = [], menuList = [] }, loading } = this.props;
    const { selectedRowKeys, modalVisible, roleOnForm } = this.state;

    const menusTreeData = VHArray.treeFormat(menuList);

    // 表格数据及翻页设置
    const result = {
      list: roleList.map((item, index) => {
        item.no = index + 1;
        return item;
      }),
      pagination: {
        total: roleList.length,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      },
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };

    // 表格显示列信息
    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
      },
      {
        title: '角色',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'remark',
      },

    ];

    // Modal 需要的方法
    const parentMethods = {
      handleSubmit: this.handleSubmit,
      handleModalVisible: this.handleModalVisible,
      handleFormValuesChanged: this.handleFormValuesChanged,
    };

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button icon="minus" type="primary" onClick={() => this.handleDel()}>
                删除
              </Button>
            </div>
            <Table
              bordered
              rowKey='id'
              loading={loading}
              dataSource={result.list}
              columns={columns}
              rowSelection={rowSelection}
              pagination={result.pagination}
              onRow={(record) => {
                return {
                  onClick: () => {
                    this.handleTableRowClick(record)
                  },  // 点击行
                }
              }}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} formValues={roleOnForm} treeData={menusTreeData}/>
      </div>
    );
  }
}
