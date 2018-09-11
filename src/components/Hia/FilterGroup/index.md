---
title:
  en-US: FilterGroup
  zh-CN: FilterGroup
subtitle: 筛选控件
cols: 1
order: 13
---

筛选控件，可选择要筛选的项目类型，并动态获取到筛选结果的value值。

## API

### FilterGroup

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| rowTypes    |要筛选的项目类型   |string[] | 可选择的值：timeSelect(日期类型),month(日期类型：月份),date(日期),area(区域),medicalInstitution(医疗机构),versionNumber(版本号),standardDepartment(标准科室),indexClassification(指标分类),index(指标),indexName(指标名称),org(单位),project(项目) |
| onChange | 标签选择的回调函数 | Function(resultVals) |  |
