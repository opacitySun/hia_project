/**
 * 根据属性名获取数据
 * @param data
 * @param propertyName
 * @returns {Array}
 */
export function getDataByProperty(data, propertyName) {
  const result = [];
  data.map((item) => {
    return result.push(item[propertyName]);
  });
  return result;
}

/**
 * 获取x轴时间数据
 * @param data
 * @param queryParams
 * @returns {Array}
 */
export function getXAxisData(data, queryParams) {
  const result = [];
  if (queryParams.p_month_code) {
    // 年+月
    data.map((item) => {
      return result.push(`${item.year_code}-${item.year_month_code}`);
    });
  } else if (queryParams.p_quarter_code) {
    // 年+季度
    data.map((item) => {
      return result.push(`${item.year_code}-${item.year_season_code}`);
    });
  } else if (queryParams.p_half_year_code) {
    // 年+半年
    data.map((item) => {
      return result.push(`${item.year_code}-${item.year_half_year_code}`);
    });
  } else if (queryParams.p_year_code) {
    // 年
    data.map((item) => {
      return result.push(item.year_code);
    });
  }
  return result;
}
