import { routerRedux } from 'dva/router';

export default {
  namespace: 'iframe',

  effects: {
    *redirect({ payload }, { put }) {
      yield put(routerRedux.push('/cost/iframe',{'pageSrc':'https://www.baidu.com'}));
    },
  },
};
