import React from 'react';
import { Link } from 'dva/router';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ menuData, links, copyright }) => {
  //循环菜单列表数据
  const menuDataList = menuData.map(function(_items){
      if(_items.url.indexOf('/sys') > -1 || _items.url == '/'){
        return;
      }
      if(_items.children){
        let item = _items.children.map(function(_item,_index){
          return (<li key={`${_items.id}:${_index}`}><Link to={_item.url}>{_item.name}</Link></li>)
        });
        return (
          <div key={_items.id} className={styles.superviseLi}>
            <h3>{_items.name}</h3>
            <ul>{item}</ul>
          </div>
        );
      }
  });

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerCon}>
          <div className={styles.supervise}>
            {menuDataList}
          </div>
          <div className={styles.Telephone}>
            <h3>联系我们</h3><br />
            <h1>4008-888-888</h1><br />
            <h3>24小时售前咨询电话</h3><br />
            <ul>
              {links.map(link => (
                <li key={link.key}>
                  <a
                    target={link.blankTarget ? "_blank" : "_self"}
                    href={link.href}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.FriendshipLinkborder}></div>
        <div className={styles.FriendshipLink}>
          <span>友情链接：</span>
          <ul>
            <li key="bottomList0"><Link to="/">卫健委</Link></li>
            <li key="bottomList1"><Link to="/">医管局</Link></li>
            <li key="bottomList2"><Link to="/">卫生局</Link></li>
            <li key="bottomList3"><Link to="/">卫生部人才交流服务</Link></li>
          </ul>
        </div>
        <div className={styles.FriendshipLinkborder}></div>
        <div className={styles.copyright}>
          {copyright}
        </div>
      </div>
    </div>
  );
};

export default GlobalFooter;
