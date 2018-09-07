/*
说明：key为一级菜单，一级菜单的value为二级菜单数组对象，二级菜单的children为三级菜单,二级菜单和三级菜单的path拼接为完整url
 */
export const tabsConfig = {
  // 医院经济运行分析
  '/cost/economicAnalysis': [{
    name: '收支结余率',
    children: [],
    path: '/cost/economicAnalysis/balanceOfPaymentsRatio',
  }, {
    name: '收入增长分析',
    children: [],
    path: '/cost/economicAnalysis/revenueGrowthAnalysis',
  }, {
    name: '门诊收入增长分析',
    path: '/cost/economicAnalysis/outpatientIncomeGrowthAnalysis',
    children: [{
      name: '诊次费用',
      path: '/cost/economicAnalysis/outpatientIncomeGrowthAnalysis/clinicalCost',
    }, {
      name: '门诊服务量',
      path: '/cost/economicAnalysis/outpatientIncomeGrowthAnalysis/outpatientAmount',
    }],
  }, {
    name: '住院收入增长分析',
    path: '/cost/economicAnalysis/hospitalizationIncomeAnalysis',
    children: [{
      name: '出院病人例均费用',
      path: '/cost/economicAnalysis/hospitalizationIncomeAnalysis/dischargedPatientsCharged',
    }, {
      name: '住院服务量',
      path: '/cost/economicAnalysis/hospitalizationIncomeAnalysis/hospitalServiceAmount',
    }],
  }, {
    name: '成本控制分析',
    path: '/cost/economicAnalysis/costControlAnalysis',
    children: [{
      name: '成本结构分析',
      path: '/cost/economicAnalysis/costControlAnalysis/costStructureAnalysis',
    }, {
      name: '管理成本分析',
      path: '/cost/economicAnalysis/costControlAnalysis/managementCostAnalysis',
    }, {
      name: '采购成本分析',
      path: '/cost/economicAnalysis/costControlAnalysis/procurementCostAnalysis',
    }, {
      name: '人力成本分析',
      path: '/cost/economicAnalysis/costControlAnalysis/manpowerCostAnalysis',
    }, {
      name: '资产效率',
      path: '/cost/economicAnalysis/costControlAnalysis/efficiencyOfAssets',
    }],
  },{
    name:'结余分析',
    path:'/cost/economicAnalysis/balanceAnalysis',
    children:[{
      name:'纯医疗成本收益分析',
      path:'/cost/economicAnalysis/balanceAnalysis/pureMedicalCostBenefitAnalysis',
    },{
      name:'门诊成本收益分析',
      path: '/cost/economicAnalysis/balanceAnalysis/outpatientCostBenefitAnalysis',
    },{
      name: '住院成本收益分析',
      path:'/cost/economicAnalysis/balanceAnalysis/costBenefitAnalysisOfHospitalization',
    },{
      name: '财政基本补助分析',
      path:'/cost/economicAnalysis/balanceAnalysis/basicFinancialSubsidiesAnalysis',
    },{
      name:'全成本收益分析(含财政)',
      path:'/cost/economicAnalysis/balanceAnalysis/totalCostBenefitAnalysis',
    }],
  }],
  // 标杆值管理
  '/cost/standardManage':[
    {
      name: '标杆值管理',
      children: [],
      path: '/cost/standardManage/standardManage',
    },
  ],
  // 项目成本分析
  '/cost/projectCostAnalysis':[
    {
      name: '明细项目成本',
      children: [],
      path: '/cost/projectCostAnalysis/itemDetailCost',
    },
    {
      name: '项目成本对比',
      children: [],
      path: '/cost/projectCostAnalysis/projectCostComparison',
    },
  ],
  // 病种成本分析
  '/cost/diseaseCostAnalysis':[
    {
      name: '病种成本对比',
      children: [],
      path: '/cost/diseaseCostAnalysis/diseaseCostComparison',
    },
  ],
};
