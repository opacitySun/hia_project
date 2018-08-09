import React, { PureComponent, Fragment } from 'react';
import { Link } from 'dva/router';
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
 * 渲染左侧scroll按钮
 * @param tabsData
 * @returns {*}
 */
const renderPreScroll = (tabsData) => {
  let classNames = ``;
  // 当二级菜单个数大于5时，显示scroll button
  if (tabsData.length > 5) {
    classNames = `${styles['scroll-btn']} ${styles.pre} ${styles['show-scroll-btn']}`;
  } else {
    classNames = `${styles['scroll-btn']} ${styles.pre} ${styles['hide-scroll-btn']}`;
  }

  return (
    <a className={classNames} href="javascript:void(0)"/>
  );
};

/**
 * 渲染右侧scroll按钮
 * @param tabsData
 * @returns {*}
 */
const renderNextScroll = (tabsData) => {
  let classNames = ``;
  // 当二级菜单个数大于5时，显示scroll button
  if (tabsData.length > 5) {
    classNames = `${styles['scroll-btn']} ${styles.next} ${styles['show-scroll-btn']}`;
  } else {
    classNames = `${styles['scroll-btn']} ${styles.next} ${styles['hide-scroll-btn']}`;
  }

  return (
    <a className={classNames} href="javascript:void(0)"/>
  );
};

/**
 * 渲染第三级tab
 * @param pathname
 * @param tabsData
 * @returns {*}
 */
const renderThirdLevelTabs = (pathname, tabsData) => {
  return tabsData.map((secondary) => {
    if (pathname.includes(secondary.path) && secondary.children.length > 0) {
      return (
        <div className={styles['three-level-tabs']}>
          <ul>
            {
              secondary.children.map((third) => {
                let selected = '';
                if(third.path === pathname){
                  selected = `${styles.selected}`;
                }
                return (
                  <Link to={third.path}>
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

export default class HiaTabs extends PureComponent {

  render() {
    // 根据url获取一级url
    const index = findChar(this.props.pathname, '/', 2);
    const pathname = this.props.pathname.substring(0, index);
    const tabsData = tabsConfig[pathname];

    return (
      <Fragment>
        <div className={styles['two-level-top-tabs']}>
          <b />
          {tabsData && renderPreScroll(tabsData)}
          <div className={styles['scroll-div']}>
            <ul>
              {tabsData && tabsData.map((item) => {
                let classNames = '';
                if (this.props.pathname.includes(item.path)) {
                  classNames = `${styles.selected} ${styles['bottom-line']}`;
                }
                return (
                  <Link to={getNext(item)}>
                    <li key={item.name} className={classNames}><p>{item.name}</p></li>
                  </Link>
                );
              })}
            </ul>
          </div>
          {tabsData && renderNextScroll(tabsData)}
        </div>
        {tabsData && renderThirdLevelTabs(this.props.pathname, tabsData)}
      </Fragment>
    );
  }
}
