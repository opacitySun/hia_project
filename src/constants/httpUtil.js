import ModelMsgBox from './ModelMsgBox';

const URL = 'sso/api/commonProcessor/commonMethod';

function headers() {
  const token = localStorage.getItem('token');

  return {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    token,
  };
}

class NetUtil {
  /*
   *  get请求
   *  url:请求地址
   *  data:参数(json对象)
   *  successFun:成功-回调函数
   *  failedFun:失败-回调函数
   * */
  static get(url, params, successFun, failedFun) {
    this.post(url, params, successFun, failedFun);
  }

  static ajaxGet(url, successFun, failedFun) {
    fetch(url, {
      method: 'get',
      headers: headers(),
    }).then((res) => {
      if (res.ok) {
        if (successFun) {
          res.json().then((data) => {
            successFun(data);
          });
        } else {
          return res.json();
        }
      } else {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText,
          url: res.url,
        });
      }
    }).catch((err) => {
      Window.progress.close();
      const title = err.statusText;
      const detail = err.url;
      ModelMsgBox.ErrorMsg(title, detail);
    });
  }

  static ajaxPost(url, params, successFun, failedFun) {
    console.log(`body:::${JSON.stringify(params)}`);
    fetch(url, {
      method: 'POST',
      headers: headers(),
      credentials: 'include',
      mode: 'cors',
      body: params,
    }).then((res) => {
      if (res.ok) {
        if (successFun) {
          res.json().then((data) => {
            successFun(data);
          });
        } else {
          return res.json();
        }
      } else {
        return Promise.reject({
          status: res.status,
          statusText: res.statusText,
          url: res.url,
        });
      }
    }).catch((err) => {
      Window.progress.close();
      const title = err.statusText;
      const detail = err.url;
      ModelMsgBox.ErrorMsg(title, detail);
    });
  }


  /*
   *  post请求
   *  url:请求地址
   *  data:参数(DataCenter对象)
   *  successFun:成功-回调函数
   *  failedFun:失败-回调函数
   * */
  static post(url, params, successFun, failedFun) {
    if (!url || url.length == 0) {
      url = URL;
    }
    if (!Window.progress.isProcessing) {
      Window.progress.open();
    }
    // fetch请求
    fetch(url, {
      method: 'POST',
      headers: headers(),
      credentials: 'include',
      mode: 'cors',
      body: params.toJson(), // JSON.stringify(params)
    })
      .then((res) => {
        Window.progress.close();
        if (res.ok) {
          if (successFun) {
            res.json().then((data) => {
              if (data.header && data.header.code == -1) {
                if (failedFun) {
                  const dc = new window.DataCenter(data);
                  failedFun(dc);
                } else {
                  const title = data.header.message.title;
                  const detail = data.header.message.detail;
                  ModelMsgBox.ErrorMsg(title, detail);
                }
              } else {
                const dc = new window.DataCenter(data);
                successFun(dc);
              }
            });
          } else {
            return res.json();
          }
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText,
            url: res.url,
          });
        }
      })
      .catch((err) => {
        Window.progress.close();
        const title = err.statusText;
        const detail = err.url;
        ModelMsgBox.ErrorMsg(title, detail);
      });
  }

  static getUrl() {
    const prol = `http://${document.location.hostname}:8080`;
    return prol;
  }

}


export default NetUtil;

