import React, { Component } from "react";
import { connect } from "dva";
import { Link,routerRedux } from "dva/router";
import { Button } from "antd";
import Iframe from "components/Hia/Iframe";
import styles from "./Login.less";

@connect(({ newlogin, loading }) => ({
  newlogin,
  loading: loading.models.newlogin
}))
export default class NewLoginPage extends Component {
  state = {
    pagePath:''
  };

  // handleWebSocket = () => {
  //   const ws = new WebSocket('ws://192.168.37.170:8080/httpTokenClient/apply-authorization-code');
  //
  //   ws.onopen = (e) => {
  //     console.log('连接上 ws 服务端了');
  //   };
  //   ws.onmessage = (msg) => {
  //     console.log('接收服务端发过来的消息: ', msg);
  //   };
  //   ws.onclose = (e) => {
  //     console.log('ws 连接关闭了');
  //   };
  //   ws.onerror = (e) => {
  //     console.log('ws 错误信息: ', e);
  //   };
  // }

  requestPage = () => {
    const self = this;
    const { dispatch } = this.props;
    dispatch({
      type: "newlogin/goPage"
    }).then(() => {
      //需要有一个权限设定，不然路由器的权限监控会重新重定向到登录页面
      localStorage.setItem('antd-pro-authority', 'admin');
      const { newlogin } = self.props;
      self.setState({
        pagePath:(newlogin.pagePath && newlogin.pagePath.message)?newlogin.pagePath.message:''
      });
    });
  }

  componentDidMount() {
    this.requestPage();
  }

  render() {
    return (
      <Iframe
        pageSrc={this.state.pagePath}
      />
    )
  }
}
