import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/sys/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo1.gif';

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const routeConfigMapMenu = (menus, routerConfig) => {
  menus.forEach(menu => {
    if(routerConfig[menu.url]) {
      routerConfig[menu.url].name = menu.name;
    }
  });
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
// const getBreadcrumbNameMap = (menuData, routerData) => {
//   const result = {};
//   const childResult = {};
//   for (const i of menuData) {
//     if (!routerData[i.url]) {
//       result[i.url] = i;
//     }
//     if (i.children) {
//       Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
//     }
//   }
//   return Object.assign({}, routerData, result, childResult);
// };

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  state = {
    isMobile,
    routerDataHistory:[],
  };
  getChildContext() {
    // console.log("?????????????");
    const { location, routerData, siderMenus } = this.props;
    return {
      location,
      // breadcrumbNameMap: getBreadcrumbNameMap(siderMenus, routerData),
    };
  }
  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
    // 获取用户信息、及用户菜单
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }
  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Ant Design Pro`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData } = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      );
      return authorizedPath;
    }
    return redirect;
  };
  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };
  handleNoticeClear = type => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  };
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
      siderMenus,
    } = this.props;

    const { pathname } = location;
    const obj = {};
    obj.path = pathname;
    obj.name = routerData[pathname].name;
    const bashRedirect = this.getBashRedirect();

    const layout = (
      <Layout>
        <Layout>
          <Header style={{ "padding": 0,"height":68+"px","lineHeight":"normal","width":"100%","position":"fixed","top": 0,"zIndex": "9999", "background":"none"}}>
            <GlobalHeader
              currentRouterData={obj}
              logo={logo}
              getMenuData = {getMenuData}
              currentUser={currentUser}
            />
          </Header>
          <Content style={{ height: '100%' }}>
            <Switch>
              {redirectData.map(item => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map(item => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  authority={item.authority}
                  redirectPath="/exception/403"
                />
              ))}
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }}>
            <GlobalFooter
              getMenuData = {getMenuData}
              links={[
                {
                  key: 'HIA医院信息联盟',
                  title: 'HIA医院信息联盟',
                  href: '/',
                  blankTarget: true,
                },
                {
                  key: 'DRG指标综合分析',
                  title: 'DRG指标综合分析',
                  href: '/',
                  blankTarget: true,
                },
                {
                  key: '区域医疗服务能力指标',
                  title: '区域医疗服务能力指标',
                  href: '/',
                  blankTarget: true,
                },
                {
                  key: '成本综合分析',
                  title: '成本综合分析',
                  href: '/',
                  blankTarget: true,
                },
                {
                  key: '院内耗材消耗监管',
                  title: '院内耗材消耗监管',
                  href: '/',
                  blankTarget: true,
                }
              ]}
              copyright={
                <Fragment>
                  <h3>北京东软望海科技有限公司版权所有<Icon type="copyright" />2018 京ICP证0000001号 隐私政策</h3>
                </Fragment>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  // currentUser: user.currentUser,
  // collapsed: global.collapsed,
  // fetchingNotices: loading.effects['global/fetchNotices'],
  // notices: global.notices,
  // siderMenus: user.userMenus,
}))(BasicLayout);
