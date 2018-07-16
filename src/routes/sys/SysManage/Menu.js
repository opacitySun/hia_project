/**
 * 系统菜单管理
 *  -- 1.菜单维护
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Tree,
  Layout,
  message,
} from 'antd';

import { VHArray } from '../../../utils/utils';

const { Content, Sider } = Layout;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

@connect(({ menu }) => {
  return {
    menu,
  }
})
@Form.create()
export default class Menu extends PureComponent {
  state = {
    checkedKeys: [],
    selectedKeys: [],
    selectedMenu: {},
    addMenu: -1,  // -1：修改菜单；0：添加目录；1：添加子菜单
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // console.log('component did mount ： this.props--', this.props);
    // console.log('dispatch -- ', dispatch);

    // 初始化页面，查询系统
    dispatch({
      type: 'menu/findAllMenu',
    });
  }

  // 单击（选择）节点
  onSelect = (selectedKeys) => {
    // console.log('onSelect', info);
    let selectedMenu = {};

    if (selectedKeys.length > 0) {
      const selectedKey = selectedKeys[0];
      const { menus } = this.props.menu;

      menus.forEach(menu => {
        if (menu.id === selectedKey) {
          selectedMenu = menu;
        }
      });

      // console.log("selectedMenu :", selectedMenu);
    }

    this.formFieldsValueSet(selectedMenu);
    this.setState({ selectedKeys, selectedMenu, addMenu: -1 });
  };

  // 勾选菜单
  onCheck = (checkedKeys) => {
    // e.preventDefault();
    // console.log(checkedKeys);
    // console.log(e);
    this.setState({ checkedKeys });

  };

  // 添加菜单
  handleFolderAdd = () => {
    this.handleSave(0);

  };

  // 添加子菜单
  handleFileAdd = () => {
    this.handleSave(1);
  };

  // 添加菜单
  handleAdd = type => {
    // const { selectedMenu } = this.state;
    // console.log(`添加 ${ type ? '子菜单' : '菜单' }的上级菜单是：${ selectedMenu.id }`);

    const newMenu = this.createMenu(type);
    this.setState({ addMenu: type });
    this.formFieldsValueSet(newMenu);
  };

  // 删除菜单
  handleDel = () => {
    const { checkedKeys } = this.state;
    // console.log('Del keys :', checkedKeys);
    this.props.dispatch({
      type: 'menu/delMenus',
      payload: [...checkedKeys],
    });
  };

  // 保存按钮 阻止
  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedMenu, addMenu } = this.state;
    const { form, dispatch } = this.props;


    // console.log('保存 ： 所选菜单', selectedMenu);

    form.validateFields((err, values) => {
      if (!err) {
        // console.log('保存  Form 信息：', values);


        const saveMenu = this.createMenu(addMenu);
        saveMenu.name = values.name;
        saveMenu.icon = values.icon;
        saveMenu.url = values.url;
        saveMenu.orderNum = values.orderNum;
        saveMenu.isDefault = values.isDefault ? '1' : '0';

        if (addMenu === -1) {  // 修改菜单
          //todo: 修改菜单时，未修改的字段值用 ‘复制属性’ 是不是更好呢
          saveMenu.id = selectedMenu.id;
          saveMenu.parentId = selectedMenu.parentId;
          saveMenu.parentName = selectedMenu.parentName;
          saveMenu.createdBy = selectedMenu.createdBy;
          saveMenu.createdDate = selectedMenu.createdDate;
          saveMenu.type = selectedMenu.type;

        } else { // 新增菜单
          saveMenu.parentId = selectedMenu.id;
          saveMenu.parentName = selectedMenu.name;
          saveMenu.id = null;
        }

        console.log('保存菜单：', saveMenu);


        dispatch({
          type: 'menu/save',
          payload: saveMenu,
        })
      }
      else {
        message.error('Form  验证失败');
      }
    });
  };

  // 取消按钮
  handleCancel = () => {
    this.formFieldsValueSet();
  };

  // 设置 Form 表单值
  formFieldsValueSet = menu => {
    const { setFieldsValue, resetFields } = this.props.form;
    if (menu == null) {
      resetFields();
    }
    else {
      setFieldsValue({
        name: menu.name,
        icon: menu.icon,
        url: menu.url,
        orderNum: menu.orderNum,
        isDefault: 0,
        // isDefault: menu.isDefault,
      });
    }
  };

  /**
   * 生成菜单对象
   *
   * @param type  类型[0：目录   1：菜单   2：按钮]
   * @returns {{id: string, parentId: string, parentName: string, name: string, url: string, perms: string, type: number, icon: string, orderNum: string, isDefault: string}}
   */
  createMenu = (type) => {
    return {
      id: '',
      parentId: '',
      parentName: '',
      name: '',
      url: '',
      perms: '',
      type,
      icon: '',
      orderNum: '',
      isDefault: '',
    };
  };

  // 根据树结构数据生成节点标签
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} />;
    });
  };

  render() {
    // console.log('render ===========', this.props);
    const { menu: { menus = [] } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { checkedKeys, selectedKeys, selectedMenu } = this.state;

    const menusTreeData = VHArray.treeFormat(menus, 'parentId');

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <div>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ padding: '24px', background: '#fff', borderRight: '2px solid #f0f2f5' }}>
            <div>
              <Button shape="circle" icon="folder-add" title='添加菜单' style={{ marginLeft: 8 }} onClick={this.handleFolderAdd}/>
              { selectedMenu.id
                ? <Button shape="circle" icon="file-add" title='添加子菜单' onClick={this.handleFileAdd} style={{ marginLeft: 8 }} />
                : ''
              }
              { checkedKeys.length === 0
                ? ''
                : <Button shape="circle" icon="close" title='删除菜单' onClick={this.handleDel} style={{ marginLeft: 8 }} />
              }
            </div>
            <Tree
              checkable
              onCheck={this.onCheck}
              onSelect={this.onSelect}
              selectedKeys={selectedKeys}
            >
              { this.renderTreeNodes(menusTreeData) }
            </Tree>
          </Sider>

          <Content style={{ padding: '24px', background: '#fff', minHeight: 280 }}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="菜单">
                {getFieldDecorator("name", {
                  rules: [
                    {required: true, message: '请输入菜单名称！'},
                  ],
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="图标">
                {getFieldDecorator("icon")(
                  <Input />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="URL">
                {getFieldDecorator("url")(
                  <Input />
                )}
              </FormItem>


              <FormItem {...formItemLayout} label="序号">
                {getFieldDecorator("orderNum")(
                  <Input />
                )}
              </FormItem>

              {
                /*
                <FormItem {...formItemLayout} label="默认">
                {getFieldDecorator("isDefault")(
                  <Checkbox />
                )}
              </FormItem>
                */
              }

              <Row>
                <Col span={18} style={{textAlign: 'right'}}>
                  <Button style={{ marginRight: 8 }} onClick={this.handleCancel}>取消</Button>
                  <Button type="primary" htmlType="submit">保存</Button>
                </Col>
              </Row>
            </Form>
          </Content>
        </Layout>
      </div>
    );
  }
}
