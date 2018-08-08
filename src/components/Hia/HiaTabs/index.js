import React, { PureComponent } from 'react';
import styles from './index.less';
import { tabsConfig } from './tabsConfig';
import { findChar } from '../../../utils/utils';

export default class HiaTabs extends PureComponent {

  renderPreScroll(tabsData) {
    let classNames = ``;
    // 当二级菜单个数大于5时，显示scroll button
    if (tabsData.length > 5) {
      classNames = `${styles['scroll-btn']} ${styles.pre} ${styles['show-scroll-btn']}`;
    } else {
      classNames = `${styles['scroll-btn']} ${styles.pre} ${styles['hide-scroll-btn']}`;
    }

    return (
      <a className={classNames} href="javascript:void(0)" />
    );
  }

  renderNextScroll(tabsData) {
    let classNames = ``;
    // 当二级菜单个数大于5时，显示scroll button
    if (tabsData.length > 5) {
      classNames = `${styles['scroll-btn']} ${styles.next} ${styles['show-scroll-btn']}`;
    } else {
      classNames = `${styles['scroll-btn']} ${styles.next} ${styles['hide-scroll-btn']}`;
    }

    return (
      <a className={classNames} href="javascript:void(0)" />
    );
  }

  render() {
    // 根据url获取一级url
    const index = findChar(this.props.pathname, '/', 2);
    const pathname = this.props.pathname.substring(0, index);
    const tabsData = tabsConfig[pathname];

    return (
      <div className={styles['two-level-top-tabs']}>
        {tabsData && this.renderPreScroll(tabsData)}
        <div className={styles['scroll-div']}>
          <ul>
            {tabsData && tabsData.map((item) => {
              let classNames = '';
              if (this.props.pathname.includes(item.path)) {
                classNames = `${styles.selected} ${styles['bottom-line']}`;
              }
              return (<li key={item.name} className={classNames}><p>{item.name}</p></li>);
            })}
          </ul>
        </div>
        {tabsData && this.renderNextScroll(tabsData)}
      </div>
    );
  }
}
