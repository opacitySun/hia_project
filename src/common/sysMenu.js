import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },

  {
    name: "系统管理",
    icon: 'setting',
    path: 'sys',
    // authority: 'admin',
    children: [
      {
        name: '菜单管理',
        path: 'menu',
      },
      {
        name: '角色管理',
        path: 'role',
      },
      {
        name:'用户管理',
        // icon:'user',
        path:'user',
      },
      {
        name: '机构',
        path: 'org',
      },
    ],
  },

  {
    name: "首页",
    icon: 'laptop',
    path: 'webIndex',
    authority: 'admin',
  },

  {
    name: "成本监管",
    icon: 'bank',
    path: 'cost',
    // authority: 'admin',
    children: [
      {
        name: '会计报表',
        path: 'accounting',
      },
      {
        name: '标杆值管理',
        path: 'standardManage',
        children: [
          {
            name: '标杆值管理',
            path: 'standardMgr',
            children: [
              {
                name: '医院标杆值管理',
                path: 'hospitalStandardMgr',
              },
              {
                name: '科室标杆值管理',
                path: 'departmentStandardMgr',
              },
            ],
          },
          {
            name: '标杆值对应关系',
            path: 'standardCorrespondence',
          },
        ],
      },
      {
        name:'指示预警',
        path:'indicatorWarning/indicatorWarning',
      },
      {
        name: '医院经济运行分析',
        path: 'economicAnalysis',
        children: [
          {
            name: '收支结余率',
            path: 'balanceOfPaymentsRatio',
          },
          {
            name: '住院收入增长分析',
            path: 'hospitalizationIncomeAnalysis',
            children: [
              {
                name: '出院病人例均费用',
                path: 'dischargedPatientsCharged',
              },
              {
                name: '住院服务量',
                path: 'hospitalServiceAmount',
              },
            ],
          },
          {
            name: '成本控制分析',
            path: 'costControlAnalysis',
            children: [
              {
                name: '成本结构分析',
                path: 'costStructureAnalysis',
              },
              {
                name: '管理成本分析',
                path: 'managementCostAnalysis',
              },
              {
                name: '采购成本分析',
                path: 'procurementCostAnalysis',
              },
              {
                name: '人力成本分析',
                path: 'manpowerCostAnalysis',
              },
              {
                name: '资产效率',
                path: 'efficiencyOfAssets',
              },
            ],
          },
          {
            name: '收入增长分析',
            path: 'revenueGrowthAnalysis',
          },
          {
            name: '门诊收入增长分析',
            path: 'outpatientIncomeGrowthAnalysis',
            children: [
              {
                name: '诊次费用',
                path: 'clinicalCost',
              },
              {
                name: '门诊服务量',
                path: 'outpatientAmount',
              },
            ],
          },
          {
            name: '结余分析',
            path: 'balanceAnalysis',
            children: [
              {
                name: '纯医疗成本收益分析',
                path: 'pureMedicalCostBenefitAnalysis',
              },
              {
                name: '门诊成本收益分析',
                path: 'outpatientCostBenefitAnalysis',
              },
              {
                name: '住院成本收益分析',
                path: 'costBenefitAnalysisOfHospitalization',
              },
              {
                name: '财政基本补助分析',
                path: 'basicFinancialSubsidiesAnalysis',
              },
              {
                name: '全成本收益分析(含财政)',
                path: 'totalCostBenefitAnalysis',
              },
            ],
          },
        ],
      },
      {
        name: '科室经营分析',
        path: 'deptManagementAnalysis',
        children: [
          {
            name: '增长分析',
            path: 'revenueAnalysis',
            children: [
              {
                name: '收入增长分析',
                path: 'revenueGrowthAnalysis',
              },
            ]
          },
          // {
          //   name: '病种盈亏分析',
          //   path: 'DiseaseAnalysis',
          // },
        ],
      },
      {
        name: '科室经营分析',
        path: 'DeptIncomeAnalysis',
        children: [
          {
            name: '收入构成分析',
            path: 'IncomeAnalysis',
          },
          {
            name: '全成本分析',
            path: 'AllCostAnalysis',
          },
          {
            name: '全成本收益分析',
            path: 'AllCostIncomeAnalysis',
          },
        ],
      },
      {
        name: '项目成本分析',
        path: 'projectCostAnalysis',
        children: [
          {
            name: '明细项目成本',
            path: 'itemDetailCost',
          },
          {
            name: '项目成本对比',
            path: 'projectCostComparison',
          },
          {
            name: '盈亏分析',
            path: 'ProjectCostAnalysis',
          },
        ],
      },
      {
        name: '病种成本分析',
        path: 'diseaseCostAnalysis',
        children: [
          {
            name: '明细病种成本',
            path: 'DiseaseCostDetail',
          },
          {
            name: '病种成本对比',
            path: 'diseaseCostComparison',
          },
          {
            name: '病种盈亏分析',
            path: 'DiseaseAnalysis',
          },
        ],
      },
    ],
  },
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
