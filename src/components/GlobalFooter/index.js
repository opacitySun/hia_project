import React from 'react';
import { Link } from 'dva/router';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = () => {

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerCon}>
          <div className={styles.supervise}>
            <div className={styles.superviseLi}>
              <h3>成本监管</h3>
              <ul>
                <li><Link to="/">会计报表</Link></li>
                <li><Link to="/">成本报表</Link></li>
                <li><Link to="/">标杆值管理</Link></li>
                <li><Link to="/">指标预警</Link></li>
                <li><Link to="/">医院经济运行分析</Link></li>
                <li><Link to="/">科室经营分析</Link></li>
                <li><Link to="/">项目成本分析</Link></li>
                <li><Link to="/">病种成本分析</Link></li>
                <li><Link to="/">自动报告</Link></li>
              </ul>
            </div>
            <div className={styles.superviseLi}>
              <h3>价格跟踪监管</h3>
              <ul>
                <li><Link to="/">全国比价</Link></li>
                <li><Link to="/">调价前预测</Link></li>
                <li><Link to="/">调价后监测</Link></li>
                <li><Link to="/">基础配置</Link></li>
              </ul>
            </div>
            <div className={styles.superviseLi}>
              <h3>绩效监评</h3>
              <ul>
                <li><Link to="/">基础设置</Link></li>
                <li><Link to="/">绩效方案维护</Link></li>
                <li><Link to="/">绩效考评</Link></li>
                <li><Link to="/">结果公示</Link></li>
              </ul>
            </div>
            <div className={styles.superviseLi}>
              <h3>供应链监管</h3>
              <ul>
                <li><Link to="/">院内耗材消耗监管</Link></li>
                <li><Link to="/">基础设置</Link></li>
              </ul>
            </div>
            <div className={styles.superviseLi}>
              <h3>DRG评价</h3>
              <ul>
                <li><Link to="/">评价方案</Link></li>
                <li><Link to="/">DRG分组</Link></li>
                <li><Link to="/">方案计算</Link></li>
                <li><Link to="/">DRG绩效分析</Link></li>
                <li><Link to="/">DRG指标报告</Link></li>
                <li><Link to="/">DRG评价报告</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.Telephone}>
            <h3>联系我们</h3><br>
            <h1>4008-888-888</h1><br>
            <h3>24小时售前咨询电话</h3><br>
            <ul>
              <li><Link to="/" target="_blank">HIA医院信息联盟</Link></li>
              <li><Link to="/" target="_blank">DRG指标综合分析</Link></li>
              <li><Link to="/" target="_blank">区域医疗服务能力指标</Link></li>
              <li><Link to="/" target="_blank">成本综合分析</Link></li>
              <li><Link to="/" target="_blank">院内耗材消耗监管</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.FriendshipLinkborder}></div>
        <div className={styles.FriendshipLink}>
          <span>友情链接：</span>
          <ul>
            <li><Link to="/">卫健委</Link></li>
            <li><Link to="/">医管局</Link></li>
            <li><Link to="/">卫生局</Link></li>
            <li><Link to="/">卫生部人才交流服务</Link></li>
          </ul>
        </div>
        <div className={styles.FriendshipLinkborder}></div>
        <div className={styles.copyright}>
          <h3>北京东软望海科技有限公司版权所有©2018  京ICP证0000001号    隐私政策</h3>
        </div>
      </div>
    </div>
  );
};

export default GlobalFooter;
