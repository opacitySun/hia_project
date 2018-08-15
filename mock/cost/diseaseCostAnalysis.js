import mockjs from 'mockjs';

export default {
  //获取病种成本的院间对比数据
  getDiseaseHospitalComparison: mockjs.mock({
    'data|100':[
      {
        'key|+1': 1,
        'no|+1': 1,
        'name|1': ['北京同仁医院','北京协和医院','天津第一人民医院','上海市中心医院','广州市第一人民医院','大连大学附属医院'],
        'number|1-10000.1-2': 1,
        'unitCost|1-10000.1-2': 1,
        'healthMaterialFee|1-10000.1-2': 1,
        'drugCharge|1-10000.1-2': 1,
        'serviceItemCost|1-10000.1-2': 1
      }
    ]
  }),
  //获取病种成本的区域对比数据
  getDiseaseRegionComparison: mockjs.mock({
    'data|10':[
      {
        'key|+1': 1,
        'no|+1': 1,
        'name|1': ['北京市','上海市','深圳市','广州市','大连市','天津市'],
        'number|1-10000.1-2': 1,
        'unitCost|1-10000.1-2': 1,
        'healthMaterialFee|1-10000.1-2': 1,
        'drugCharge|1-10000.1-2': 1,
        'serviceItemCost|1-10000.1-2': 1
      }
    ]
  }),
  //获取病种成本的类型对比数据
  getDiseaseStyleComparison: mockjs.mock({
    'data|10':[
      {
        'key|+1': 1,
        'no|+1': 1,
        'name|1': ['综合医院','口腔医院','中医院','妇幼保健医院','儿童医院','肿瘤医院'],
        'number|1-10000.1-2': 1,
        'unitCost|1-10000.1-2': 1,
        'healthMaterialFee|1-10000.1-2': 1,
        'drugCharge|1-10000.1-2': 1,
        'serviceItemCost|1-10000.1-2': 1
      }
    ]
  }),
  //获取病种成本的等级对比数据
  getDiseaseGradeComparison: mockjs.mock({
    'data|10':[
      {
        'key|+1': 1,
        'no|+1': 1,
        'name|1': ['三级甲等','三级乙等','二级甲等','二级乙等','一级甲等','一级乙等'],
        'number|1-10000.1-2': 1,
        'unitCost|1-10000.1-2': 1,
        'healthMaterialFee|1-10000.1-2': 1,
        'drugCharge|1-10000.1-2': 1,
        'serviceItemCost|1-10000.1-2': 1
      }
    ]
  }),
};
