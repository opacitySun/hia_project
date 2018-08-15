/**
 * 添加维护 js 工具类、方法
 *
 */

/**
 * 字符串工具
 *  -- 封装字符串相关的工具方法
 * @type {{}}
 */
export const VHStrUtil = {
  /**
   * 字符串是否为空
   *
   * @param str
   * @returns {boolean}
   */
  isNullOrEmpty: (str) => {
    return str == null || str.trim().length == 0;
  },


};

/**
 * 数组工具
 *  -- 封装数组相关工具方法
 *
 * @type {{}}
 */
export const VHArrayUtil = {
  /**
   * 数组转换为Map
   * --将数组根据指定元素转化为Map
   *
   * @param arr  -- 要转换的数组
   * @param key  -- 数组元素(对象)作为 key 的字段，一般为对象的主键
   * @param value  -- 数组元素(对象)作为 value 的字段，一般为对象的名称
   */
  toObj: (arr, key = 'codeId', value = 'codeName') => {
    let _obj = {};
    if (arr.constructor !== Array) {
      console.warn("=========== Not an Array :", arr);
      return _obj;
    }
    arr.forEach(item => {
      _obj[item[key]] = item[value];
    });
    return _obj;
  },


};

/**
 * 时间工具
 *
 * @type {{}}
 */
export const VHDateUtil = {
  formatEnum: {
    YY_MM_DD: 'yyyy-mm-dd',
    YY_MM_DD_HH_MI_SS: 'yyyy-mm-dd hh:mi:ss'
  },

  dateFormat: (date, formatStr) => {
    if (date === null) return null;
    if (typeof date === 'string') return date;
    if (typeof date === 'number') date = new Date(date);
    if (formatStr === undefined) {
      formatStr = VHDateUtil.formatEnum.YY_MM_DD;
    }
    let _year = date.getFullYear(),
      _month = date.getMonth() + 1,
      _day = date.getDate();
    if (VHDateUtil.formatEnum.YY_MM_DD === formatStr) {
      return _year + "-" + _month + "-" + _day;
    }
    else if (this.formatEnum.YY_MM_DD_HH_MI_SS === formatStr) {
      let _hh = date.getHours(), _mi = date.getMinutes(), _ss = date.getSeconds();
      return _year + "-" + _month + "-" + _day + " " + _hh + ":" + _mi + ":" + _ss;
    }
    return '';
  }
};

/**
 * DOM 操作
 *
 * @type {{}}
 */
export const VHDomUtil = {
  /**
   * 指定元素（元素ID 或 className）的高度
   * @param eleIdOrClass
   * @returns {*}    元素的高度；0-没有指定元素
   */
  getElementHeight: (eleIdOrClass) => {
    if (eleIdOrClass === 'window') {
      return window.innerHeight;
    }
    let element = document.getElementById(eleIdOrClass);
    if (element === null) {
      element = document.getElementsByClassName(eleIdOrClass)[0];
    }
    return element ? element.offsetHeight : 0;
  },

  setElementHeight: (eleId, height) => {
    let ele = document.getElementById(eleId);
    if (ele) {
      ele.style.height = height + 'px';
    }
  },

  setTableBodyHeight: (height) => {
    let tableBody = document.getElementsByClassName('ant-table-body');
    // console.log('要设置高度的 Table Body ', tableBody);
    if (tableBody.length) {
      height += '';
      if (height.indexOf('px') === -1) {
        height += 'px';
      }
      for (let i = 0; i < tableBody.length; i++) {
        tableBody[i].style.height = height;
      }
      // console.log("设置 Table Body 高度：", height);
    }
  },

  /**
   * 修改表格高度
   *
   */
  resetTableBodyHeight: () => {
    let self = this;
    let headerEles = document.getElementsByClassName('vh-header'),
      headerHeight = headerEles[0] ? headerEles[0].offsetHeight : 0,
      windowHeight = window.innerHeight;
    // 设置 table Body 的高度
    VHDomUtil.setTableBodyHeight(windowHeight - headerHeight - 270);
  }
}

/**
 * 通用操作
 *
 * @type {{}}
 */
export const VHUtil = {
  isStopDate: () => {
    let isStopDict = [
      {codeId: '1', codeName: '是'},
      {codeId: '0', codeName: '否'}
    ];
    return isStopDict;
  }
};

/**
 * 对象操作
 *
 * @type {{}}
 */
export const VHObject = {
  /**
   * 对象值复制
   *
   * @param values2Obj  被赋值的对象
   * @param valuesFromObj 被复制属性值的对象
   * @param deepFlag  是否深度赋值
   */
  copyValues: (values2Obj, valuesFromObj, deepFlag = false) => {
    Object.keys(values2Obj).forEach(key => {
      if (deepFlag && typeof valuesFromObj[key] === 'object') {
        values2Obj[key] = JSON.parse(JSON.toJson(valuesFromObj[key]));
      }
      else {
        values2Obj[key] = valuesFromObj[key];
      }
    });
  }
};
