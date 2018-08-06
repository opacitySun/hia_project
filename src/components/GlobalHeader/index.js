import React, { PureComponent } from "react";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import classNames from "classnames";
import styles from "./index.less";
const SubMenu = Menu.SubMenu;

/*
es6 style
className={`${styles.dot} ${styles.dot1}`}

classnames style
className={classNames(styles.dot,styles.dot1)}
*/

export default class GlobalHeader extends PureComponent {
  state = {
    current: "index",
    menuBgHeight: 0
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  //控制公共头部子菜单后的布幕高度
  onOpenChange = openKeys => {
    if (openKeys.length > 0) {
      let key = openKeys[0];
      let hoverMenuHeight = document.getElementById(key + "$Menu").clientHeight;
      this.setState({
        menuBgHeight: hoverMenuHeight + "px"
      });
    } else {
      this.setState({
        menuBgHeight: 0
      });
    }
  };

  render() {
    const { logo,getMenuData } = this.props;

    //循环菜单列表数据,来自于src/common/menu.js
    const menuData = getMenuData().map(function(_items,_itemsIndex){
        if(_items.children){
          let dotClassName;
          if(_itemsIndex == 1){
            dotClassName = classNames(styles.dot, styles.dot1);
          }else if(_itemsIndex == 2){
            dotClassName = classNames(styles.dot, styles.dot2);
          }else if(_itemsIndex == 3){
            dotClassName = classNames(styles.dot, styles.dot3);
          }else if(_itemsIndex == 4){
            dotClassName = classNames(styles.dot, styles.dot4);
          }else if(_itemsIndex == 5){
            dotClassName = classNames(styles.dot, styles.dot5);
          }
          let item = _items.children.map(function(_item,_itemIndex){
            return (
              <Menu.Item key={`${_items.key}:${_itemIndex}`}>
                <Link to={_item.path} className={styles.linkColor}>
                  <i className={dotClassName} />{_item.name}
                </Link>
              </Menu.Item>
            )
          });
          return (
            <SubMenu
              key={_items.key}
              title={
                <span className="submenu-title-wrapper">
                  <Link to={_items.path} className={styles.linkColor}>
                    {_items.name}
                  </Link>
                </span>
              }
            >
            {item}
            </SubMenu>
          );
        }else{
          return (
            <Menu.Item key={_items.key}>
              <Link to={_items.path} className={styles.linkColor}>{_items.name}</Link>
            </Menu.Item>
          );
        }
    });

    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoImg} key="logo">
            <img src={logo} />
          </Link>
          <span>医疗监管平台</span>
        </div>
        <b
          className={styles.menuBg}
          style={{ height: this.state.menuBgHeight }}
        />
        <div className={styles.nav}>
          <Menu
            className={styles.menu}
            onClick={this.handleClick}
            onOpenChange={this.onOpenChange}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            {menuData}
          </Menu>
        </div>
        <div className={styles.indicator}>
          <div className={styles.sign}>
            <Icon type="search" />
            <Link to="/" className={styles.linkColor}>
              登录
            </Link>
            <Link
              to="/"
              className={classNames(styles.linkColor, styles.register)}
            >
              注册
            </Link>
          </div>
          <div className={styles.console}>
            <Icon type="setting" />
            <Link to="/sys" className={styles.linkColor}>
              控制台
            </Link>
            <Link
              to="/"
              className={classNames(styles.linkColor, styles.register)}
            >
              投大屏
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
