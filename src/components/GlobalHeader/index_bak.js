import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

const SubMenu = Menu.SubMenu;

export default class GlobalHeader extends PureComponent {
  state = {
    current: 'index',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const {
      logo,
      menuList
    } = this.props;

    const menu = menuList.map(items => (
      <SubMenu key={items.key} title={<span className="submenu-title-wrapper"><a href={items.href} rel="noopener noreferrer">{items.name}</a></span>}>
        items.children?items.children.map((item,key) => (
          return (<Menu.Item key={key}><a href={item.href}>{item.name}</a></Menu.Item>)
        )):''
      </SubMenu>
    ));

    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoImg} key="logo">
            <img src={logo} />
          </Link>
          <span>医疗监管平台</span>
        </div>
        <div className={styles.nav}>
          <Menu className={styles.menu} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            {menu}
          </Menu>
        </div>
        <div className={styles.indicator}>
          <div className={styles.sign}>
            <Icon type="search" />
            <a href="signin.html">登录</a>
            <a href="register.html" className={styles.register}>注册</a>
          </div>
          <div className={styles.console}>
            <Icon type="setting" />
            <a href="javascript:void(0)">控制台</a>
            <a href="javascript:void(0)" className={styles.register}>投大屏</a>
          </div>
        </div>
      </div>
    );
  }
}


// <Menu className={styles.menu} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
//             <Menu.Item key="index">
//               <a href="javascript:void(0)">首页</a>
//             </Menu.Item>
//             <SubMenu key="cost" title={<span className="submenu-title-wrapper"><Link to="/" className={styles.linkColor}>成本监管</Link></span>}>
//               <Menu.Item><Link to="/" className={styles.linkColor}>会计报表</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>成本报表</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>标杆值管理</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>指标预警</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>医院经济运行分析</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>科室经营分析</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>项目成本分析</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>病种成本分析</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>自动报告</Link></Menu.Item>
//             </SubMenu>
//             <SubMenu key="price" title={<span className="submenu-title-wrapper"><Link to="/" className={styles.linkColor}>价格跟踪监管</Link></span>}>
//               <Menu.Item><Link to="/" className={styles.linkColor}>全国比价</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>调价前预测</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>调价后监测</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>基础配置</Link></Menu.Item>
//             </SubMenu>
//             <SubMenu key="performance" title={<span className="submenu-title-wrapper"><Link to="/" className={styles.linkColor}>绩效监评</Link></span>}>
//               <Menu.Item><Link to="/" className={styles.linkColor}>基础设置</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>绩效方案维护</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>绩效考评</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>结果公示</Link></Menu.Item>
//             </SubMenu>
//             <SubMenu key="supply" title={<span className="submenu-title-wrapper"><Link to="/" className={styles.linkColor}>供应链监管</Link></span>}>
//               <Menu.Item><Link to="/" className={styles.linkColor}>院内耗材消耗监管</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>基础设置</Link></Menu.Item>
//             </SubMenu>
//             <SubMenu key="drg" title={<span className="submenu-title-wrapper"><Link to="/" className={styles.linkColor}>DRG评价</Link></span>}>
//               <Menu.Item><Link to="/" className={styles.linkColor}>评价方案</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>DRG分组</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>方案计算</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>DRG绩效分析</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>DRG指标报告</Link></Menu.Item>
//               <Menu.Item><Link to="/" className={styles.linkColor}>DRG评价报告</Link></Menu.Item>
//             </SubMenu>
//             <Menu.Item key="aboutus">
//               <Link to="/" className={styles.linkColor}>关于我们</Link>
//             </Menu.Item>
//           </Menu>