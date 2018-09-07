import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './sysMenu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user','login','bdDict','filterGroup'], () => import('../layouts/SysLayout')),
    },
    '/webIndex': {
      component: dynamicWrapper(app, ['webIndex'], () => import('../routes/cost/Index/Index')),
    },
    // '/config': {
    //   component: dynamicWrapper(app, [], () => import('../routes/cost/ShowPage/SysParamConfig')),
    // },
    '/cost/standardManage/standardMgr/hospitalStandardMgr': {
      component: dynamicWrapper(app, ['standardMgr','bdDict'], () => import('../routes/cost/standardMgr/hospitalStandardMgr/HospitalStandardMgr')),
    },
    '/cost/standardManage/standardMgr/departmentStandardMgr': {
      component: dynamicWrapper(app, ['standardMgr','bdDict'], () => import('../routes/cost/standardMgr/departmentStandardMgr/DepartmentStandardMgr')),
    },
    '/cost/standardManage/standardManage': {
      component: dynamicWrapper(app, [], () => import('../routes/cost/StandardManage/StandardManage')),
    },
    // 标杆值管理 - 标杆值对应关系
    '/cost/standardManage/standardCorrespondence': {
      component: dynamicWrapper(app, ['standardManage'], () => import('../routes/cost/StandardManage/StandardCorrespondence')),
    },
    // 指示预警
    '/cost/indicatorWarning/indicatorWarning': {
      component: dynamicWrapper(app, ['indicatorWarning'], () => import('../routes/cost/IndicatorWarning/IndicatorWarning')),
    },
    // // 收支结余率
    // '/cost/economicAnalysis/balanceOfPaymentsRatio': {
    //   component: dynamicWrapper(app, ['balanceOfPaymentsRatio','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/BalanceOfPaymentsRatio/BalanceOfPaymentsRatio')),
    // },
    // 收支结余率
    '/cost/economicAnalysis/balanceOfPaymentsRatio': {
      component: dynamicWrapper(app, ['balanceOfPaymentsRatio','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/BalanceOfPayments')),
    },
    // 住院收入增长分析-出院病人例均费用
    '/cost/economicAnalysis/hospitalizationIncomeAnalysis/dischargedPatientsCharged': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/InpIncomeAnalysis/patientsAverageFee')),
    },
    // 住院收入增长分析-住院服务量
    '/cost/economicAnalysis/hospitalizationIncomeAnalysis/hospitalServiceAmount': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/InpIncomeAnalysis/inpServicesVolume')),
    },
    // 成本控制分析-成本结构分析
    '/cost/economicAnalysis/costControlAnalysis/costStructureAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/CostControlAnalysis/CostStructureAnalysis')),
    },
    // 成本控制分析-管理成本分析
    '/cost/economicAnalysis/costControlAnalysis/managementCostAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/CostControlAnalysis/ManagementCostAnalysis')),
    },
    // 成本控制分析-采购成本分析
    '/cost/economicAnalysis/costControlAnalysis/procurementCostAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/CostControlAnalysis/ProcurementCostAnalysis')),
    },
    // 成本控制分析-人力成本分析
    '/cost/economicAnalysis/costControlAnalysis/manpowerCostAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/CostControlAnalysis/ManpowerCostAnalysis')),
    },
    // 成本控制分析-资产效率
    '/cost/economicAnalysis/costControlAnalysis/efficiencyOfAssets': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/CostControlAnalysis/EfficiencyOfAssets')),
    },
    // 收入增长分析
    '/cost/economicAnalysis/revenueGrowthAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/RevenueGrowthAnalysis/RevenueGrowthAnalysis')),
    },
    // 收入构成分析
    '/cost/DeptIncomeAnalysis/IncomeAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/DeptIncomeAnalysis/IncomeAnalysis/IncomeConstituteAnalysis')),
    },
    // 全成本分析
    '/cost/DeptIncomeAnalysis/AllCostAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/DeptIncomeAnalysis/AllCostAnalysis')),
    },
    // 全成本收益分析
    '/cost/DeptIncomeAnalysis/AllCostIncomeAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/DeptIncomeAnalysis/AllCostIncomeAnalysis')),
    },
    // 门诊收入增长分析-诊次费用
    '/cost/economicAnalysis/outpatientIncomeGrowthAnalysis/clinicalCost': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/OutpIncomeAnalysis/consultationFee')),
    },
    // 门诊收入增长分析-门诊服务量
    '/cost/economicAnalysis/outpatientIncomeGrowthAnalysis/outpatientAmount': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/OutpIncomeAnalysis/outpServicesVolum')),
    },
    // 结余分析-纯医疗成本收益分析
    '/cost/economicAnalysis/balanceAnalysis/pureMedicalCostBenefitAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/BalanceAnalysis/PureMedicalCostBenefitAnalysis')),
    },
    // 结余分析-门诊成本收益分析
    '/cost/economicAnalysis/balanceAnalysis/outpatientCostBenefitAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/BalanceAnalysis/OutpatientCostBenefitAnalysis')),
    },
    // 结余分析-住院成本收益分析
    '/cost/economicAnalysis/balanceAnalysis/costBenefitAnalysisOfHospitalization': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/BalanceAnalysis/CostBenefitAnalysisOfHospitalization')),
    },
    // 结余分析-财政基本补助分析
    '/cost/economicAnalysis/balanceAnalysis/basicFinancialSubsidiesAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/BalanceAnalysis/BasicFinancialSubsidiesAnalysis')),
    },
    // 结余分析-全成本收益分析(含财政)
    '/cost/economicAnalysis/balanceAnalysis/totalCostBenefitAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/HospitalEconomicOperationAnalysis/BalanceAnalysis/TotalCostBenefitAnalysis')),
    },
    // 项目成本分析-明细项目成本
    '/cost/projectCostAnalysis/itemDetailCost': {
      component: dynamicWrapper(app, ['projectCostAnalysis','filterGroup'], () => import('../routes/cost/ProjectCostAnalysis/ItemDetailCost')),
    },
    // 项目成本分析-项目成本对比
    '/cost/projectCostAnalysis/projectCostComparison': {
      component: dynamicWrapper(app, ['projectCostAnalysis','filterGroup'], () => import('../routes/cost/ProjectCostAnalysis/ProjectCostComparison/ProjectCostComparison')),
    },
    // 项目成本分析-盈亏分析
    '/cost/projectCostAnalysis/ProjectCostAnalysis': {
      component: dynamicWrapper(app, ['projectCostAnalysis','filterGroup'], () => import('../routes/cost/ProjectCostAnalysis/ProjectCostAnalysis')),
    },
    //病种成本分析-明细病种成本
    '/cost/diseaseCostAnalysis/DiseaseCostDetail': {
      component: dynamicWrapper(app, ['diseaseCostAnalysis','filterGroup'], () => import('../routes/cost/DiseaseCostAnalysis/DiseaseCostDetail')),
    },
    // 病种成本分析-病种成本对比
    '/cost/diseaseCostAnalysis/diseaseCostComparison': {
      component: dynamicWrapper(app, ['diseaseCostAnalysis','filterGroup'], () => import('../routes/cost/DiseaseCostAnalysis/DiseaseCostComparison/DiseaseCostComparison')),
    },
    //病种成本分析-病种盈亏分析
    '/cost/diseaseCostAnalysis/DiseaseAnalysis': {
      component: dynamicWrapper(app, ['diseaseCostAnalysis','filterGroup'], () => import('../routes/cost/DiseaseCostAnalysis/DiseaseAnalysis')),
    },
    // 科室经营分析-增长分析-收入增长分析
    '/cost/deptManagementAnalysis/revenueAnalysis/revenueGrowthAnalysis': {
      component: dynamicWrapper(app, ['filterGroup','hiatabs'], () => import('../routes/cost/deptManagementAnalysis/revenueAnalysis/revenueGrowthAnalysis')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/sys/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/sys/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/sys/Exception/500')),
    },

    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/sys/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/sys/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/sys/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
    // '/sys': {
    //   component: dynamicWrapper(app, ['user','newlogin'], () => import('../layouts/SysLayout')),
    // },
    '/sys/menu': {
      component: dynamicWrapper(app, ['menu'], () => import('../routes/sys/SysManage/Menu')),
    },
    '/sys/role': {
      component: dynamicWrapper(app, ['sysUser'], () => import('../routes/sys/SysManage/Role')),
    },
    '/sys/user': {
      component: dynamicWrapper(app, ['sysUser'], () => import('../routes/sys/SysManage/User')),
    },
    '/sys/org': {
      component: dynamicWrapper(app, ['org','filterGroup','hiaModal'], () => import('../routes/cost/Org/org')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
