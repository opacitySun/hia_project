import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip  } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

let open = true;
export default class GlobalHeader extends PureComponent {
  state={
    routerDataHistory:[],
    open:true,
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      currentRouterData,
    } = this.props;
    // console.log('this.props',this.props)
    // console.log('currentRouterData',currentRouterData)
    // console.log('this.state.currentRouterData',this.state.routerDataHistory)
    //如果是打开菜单
    if(open===true){
      //如果菜单不在历史菜单里面，则加入历史菜单
      if(!this.state.routerDataHistory.some(item=>item.path===currentRouterData.path)){
        if(currentRouterData.path !== '/'){
          this.state.routerDataHistory.push(currentRouterData);
        }
        //如果历史菜单数量超过5个，则删除第一个
        if(this.state.routerDataHistory.length > 5){
          this.state.routerDataHistory.shift();
        }
      }
    }
    //如果是关闭菜单
    else{
      open = true;
    }


    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        {this.state.routerDataHistory.map((item,key)=>{
          return <Tag key={key} closable onClose={(e)=>{
            e.preventDefault();
            console.log(key)
            if(this.state.routerDataHistory.length === 1) {
              return;
            }
            let path = '/#';
            if(this.state.routerDataHistory.length === key+1){
              path += this.state.routerDataHistory[key-1].path;
            }else{
              path += this.state.routerDataHistory[key+1].path;
            }
            this.setState({
              routerDataHistory:this.state.routerDataHistory.filter((item,k)=>key!==k),
            })
            open = false;
            window.location.href = path;
          }}><a href={'/#'+item.path}>{item.name}</a></Tag>;
        })}
        <div className={styles.right}>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                <span className={styles.name}>{`${ currentUser.name }(${ currentUser.username })`}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
