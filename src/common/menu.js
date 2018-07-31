import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    key:'index',
    path: 'index',
    authority: 'admin' //admin guest
  },
  {
    name: '成本监管',
    key:'cost',
    path: 'cost',
    authority: 'admin', //admin guest
    children: [
      {
        name: '会计报表',
        path: 'accounting',
      },
      {
        name: '成本报表',
        path: 'cost',
      },
      {
        name: '标杆值管理',
        path: '',
      },
      {
        name: '指标预警',
        path: 'indicatorWarning',
      },
      {
        name: '医院经济运行分析',
        path: '',
      },
      {
        name: '科室经营分析',
        path: '',
      },
      {
        name: '项目成本分析',
        path: '',
      },
      {
        name: '病种成本分析',
        path: '',
      },
      {
        name: '自动报告',
        path: '',
      }
    ]
  },
  {
    name: '价格跟踪监管',
    key:'price',
    path: 'price',
    authority: 'admin', //admin guest
    children: [
      {
        name: '全国比价',
        path: '',
      },
      {
        name: '调价前预测',
        path: '',
      },
      {
        name: '调价后监测',
        path: '',
      },
      {
        name: '基础配置',
        path: '',
      }
    ]
  },
  {
    name: '绩效监评',
    key:'performance',
    path: 'performance',
    authority: 'admin', //admin guest
    children: [
      {
        name: '基础设置',
        path: '',
      },
      {
        name: '绩效方案维护',
        path: '',
      },
      {
        name: '绩效考评',
        path: '',
      },
      {
        name: '结果公示',
        path: '',
      }
    ]
  },
  {
    name: '供应链监管',
    key:'supply',
    path: 'supply',
    authority: 'admin', //admin guest
    children: [
      {
        name: '院内耗材消耗监管',
        path: '',
      },
      {
        name: '基础设置',
        path: '',
      }
    ]
  },
  {
    name: 'DRG评价',
    key:'drg',
    path: 'drg',
    authority: 'admin', //admin guest
    children: [
      {
        name: '评价方案',
        path: '',
      },
      {
        name: 'DRG分组',
        path: '',
      },
      {
        name: '方案计算',
        path: '',
      },
      {
        name: 'DRG绩效分析',
        path: '',
      },
      {
        name: 'DRG指标报告',
        path: '',
      },
      {
        name: 'DRG评价报告',
        path: '',
      }
    ]
  },
  {
    name: '关于我们',
    key:'aboutus',
    path: 'aboutus',
    authority: 'admin' //admin guest
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
