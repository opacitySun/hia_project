import React, { PureComponent } from "react";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import classNames from "classnames";
import styles from "./index.less";
const SubMenu = Menu.SubMenu;

const documentW = document.documentElement.clientWidth;

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
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  onOpenChange = openKeys => {
    console.log(openKeys);
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
    const { logo, menuList } = this.props;

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
            <Menu.Item key="index">
              <Link to="/" className={styles.linkColor}>
                首页
              </Link>
            </Menu.Item>
            <SubMenu
              key="cost"
              title={
                <span className="submenu-title-wrapper">
                  <Link to="/" className={styles.linkColor}>
                    成本监管
                  </Link>
                </span>
              }
            >
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />会计报表
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />成本报表
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />标杆值管理
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />指标预警
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />医院经济运行分析
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />科室经营分析
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />项目成本分析
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />病种成本分析
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot1)} />自动报告
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="price"
              title={
                <span className="submenu-title-wrapper">
                  <Link to="/" className={styles.linkColor}>
                    价格跟踪监管
                  </Link>
                </span>
              }
            >
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot2)} />全国比价
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot2)} />调价前预测
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot2)} />调价后监测
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot2)} />基础配置
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="performance"
              title={
                <span className="submenu-title-wrapper">
                  <Link to="/" className={styles.linkColor}>
                    绩效监评
                  </Link>
                </span>
              }
            >
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot3)} />基础设置
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot3)} />绩效方案维护
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot3)} />绩效考评
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot3)} />结果公示
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="supply"
              title={
                <span className="submenu-title-wrapper">
                  <Link to="/" className={styles.linkColor}>
                    供应链监管
                  </Link>
                </span>
              }
            >
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot4)} />院内耗材消耗监管
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot4)} />基础设置
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="drg"
              title={
                <span className="submenu-title-wrapper">
                  <Link to="/" className={styles.linkColor}>
                    DRG评价
                  </Link>
                </span>
              }
            >
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot5)} />评价方案
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot5)} />DRG分组
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot5)} />方案计算
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot5)} />DRG绩效分析
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot5)} />DRG指标报告
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/" className={styles.linkColor}>
                  <i className={classNames(styles.dot, styles.dot5)} />DRG评价报告
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="aboutus">
              <Link to="/" className={styles.linkColor}>
                关于我们
              </Link>
            </Menu.Item>
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
            <Link to="/" className={styles.linkColor}>
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
