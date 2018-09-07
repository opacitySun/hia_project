class MyUtil {
  static getQueryString = (queryString, name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    let r = queryString.substr(1).match(reg);

    if (r != null) {

      return decodeURI(r[2])

    }

    return null;
  };

  static mapListToObject = (data, decodeVal, decodeDisplay) => {
    if (decodeVal === undefined) {
      decodeVal = "codeId";
    }
    if (decodeDisplay === undefined) {
      decodeDisplay = "codeName";
    }
    let obj = {};
    data.forEach(item => {
      obj[item[decodeVal]] = item[decodeDisplay];
    });
    return obj;
  };

  static mapListToObject2 = (data, decodeVal) => {
    if (decodeVal === undefined) {
      decodeVal = "codeId";
    }
    let obj = {};
    data.forEach(item => {
      obj[item[decodeVal]] = item;
    });
    return obj;
  };

  static  isRepeat = (arr) => {
    let hash = {};
    for (let i in arr) {
      if (hash[arr[i]])
        return true;
      hash[arr[i]] = true;
    }
    return false;
  };
}

export default MyUtil
