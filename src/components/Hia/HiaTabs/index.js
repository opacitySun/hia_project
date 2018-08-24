import React, { PureComponent, Fragment } from 'react';
import { Link } from 'dva/router';
import { connect } from "dva";
import styles from './index.less';
import { tabsConfig } from './tabsConfig';
import { findChar } from '../../../utils/utils';

/**
 * 获取tab的url
 * @param item
 * @returns {*|string}
 */
const getNext = (item) => {
  let next = '';
  if (item.children.length === 0) {
    next = item.path;
  } else {
    next = item.children[0].path;
  }
  return next;
};

/**
 * 左侧scroll按钮点击事件
 * @param tabsData
 * @param self
 * @returns {*}
 */
const clickPreScroll = (tabsData,self) => {
  const tabsLen = tabsData.length;
  const currentTabIndex = self.state.currentTabIndex;
  let tabIndex = 0;
  if(currentTabIndex == 0){
    tabIndex = tabsLen-1;
  }else{
    tabIndex = currentTabIndex-1;
  }
  self.props.dispatch({
    type: "hiatabs/redirect",
    payload:{
      path:getNext(tabsData[tabIndex])
    }
  });
};

/**
 * 渲染左侧scroll按钮
 * @param tabsData
 * @param self
 * @returns {*}
 */
const renderPreScroll = (tabsData,self) => {
  let classNames = ``;
  // 当二级菜单个数大于5时，显示scroll button
  if (tabsData.length > 5) {
    classNames = `${styles['scroll-btn']} ${styles.pre} ${styles['show-scroll-btn']}`;
  } else {
    classNames = `${styles['scroll-btn']} ${styles.pre} ${styles['hide-scroll-btn']}`;
  }

  return (
    <a className={classNames} href="javascript:void(0)" onClick={ () => clickPreScroll(tabsData,self)}></a>
  );
};

/**
 * 右侧scroll按钮点击事件
 * @param tabsData
 * @param self
 * @returns {*}
 */
const clickNextScroll = (tabsData,self) => {
  const tabsLen = tabsData.length;
  const currentTabIndex = self.state.currentTabIndex;
  let tabIndex = 0;
  if(currentTabIndex == tabsLen-1){
    tabIndex = 0;
  }else{
    tabIndex = currentTabIndex+1;
  }
  self.props.dispatch({
    type: "hiatabs/redirect",
    payload:{
      path:getNext(tabsData[tabIndex])
    }
  });
};

/**
 * 渲染右侧scroll按钮
 * @param tabsData
 * @param self
 * @returns {*}
 */
const renderNextScroll = (tabsData,self) => {
  let classNames = ``;
  // 当二级菜单个数大于5时，显示scroll button
  if (tabsData.length > 5) {
    classNames = `${styles['scroll-btn']} ${styles.next} ${styles['show-scroll-btn']}`;
  } else {
    classNames = `${styles['scroll-btn']} ${styles.next} ${styles['hide-scroll-btn']}`;
  }

  return (
    <a className={classNames} href="javascript:void(0)" onClick={() => clickNextScroll(tabsData,self)}></a>
  );
};

/**
 * 渲染第三级tab
 * @param pathname
 * @param tabsData
 * @returns {*}
 */
const renderThirdLevelTabs = (pathname, tabsData) => {
  return tabsData.map((secondary,index) => {
    if (pathname.includes(secondary.path) && secondary.children.length > 0) {
      return (
        <div key={index} className={styles['three-level-tabs']}>
          <ul>
            {
              secondary.children.map((third) => {
                let selected = '';
                if(third.path === pathname){
                  selected = `${styles.selected}`;
                }
                return (
                  <Link key={third.name} to={third.path}>
                    <li className={selected}><p>{third.name}</p><i/></li>
                  </Link>);
              })
            }
          </ul>
        </div>
      );
    } else {
      return null;
    }
  });
};

@connect(({ hiatabs, loading }) => ({
  hiatabs,
  loading: loading.models.hiatabs
}))
export default class HiaTabs extends PureComponent {
  state = {
    //ul的left值
    ulLeft:0,
    //当前选中的tab的索引
    currentTabIndex:0
  };

  render() {
    // 根据url获取一级url
    const index = findChar(this.props.pathname, '/', 2);
    const pathname = this.props.pathname.substring(0, index);
    const tabsData = tabsConfig[pathname];

    return (
      <Fragment>
        <div className={styles['two-level-top-tabs']}>
          <b />
          {tabsData && renderPreScroll(tabsData,this)}
          <div className={styles['scroll-div']}>
            <ul style={{left:this.state.ulLeft+'px'}}>
              {tabsData && tabsData.map((item,index) => {
                let classNames = '';
                if (this.props.pathname.includes(item.path)) {
                  classNames = `${styles.selected} ${styles['bottom-line']}`;

                  //控制scroll的left位置，并记录下当前页面的tab索引
                  let ulLeftIndex = 0;
                  if(index > 4){
                    ulLeftIndex = index - 4;
                  }
                  const ulLeft = -(ulLeftIndex * 220);
                  this.setState({
                    currentTabIndex:index,
                    ulLeft:ulLeft
                  });
                }
                return (
                  <Link key={item.name} to={getNext(item)}>
                    <li className={classNames}><p>{item.name}</p></li>
                  </Link>
                );
              })}
            </ul>
          </div>
          {tabsData && renderNextScroll(tabsData,this)}
        </div>
        {tabsData && renderThirdLevelTabs(this.props.pathname, tabsData)}
      </Fragment>
    );
  }
}
