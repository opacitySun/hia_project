import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import { getRoutes } from '../utils/utils';

class UserNewLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'HIA医院信息联盟';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - HIA医院信息联盟`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div style={{width:'100%',height:'auto'}}>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))}
            <Redirect exact from="/user" to="/user/login" />
          </Switch>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserNewLayout;
