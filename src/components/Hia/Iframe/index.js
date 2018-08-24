import React, { PureComponent } from "react";
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Button } from 'antd';
import styles from './index.less';

export default class Iframe extends PureComponent {
  state = {
    iFrameHeight: 0
  };

  onLoad = () => {
    const { filterResult } = this.props;
    const obj = ReactDOM.findDOMNode(this);
    this.setState({
      "iFrameHeight":  obj.contentWindow.parent.document.body.scrollHeight + 'px'
    });
    if(filterResult){
      obj.contentWindow.filterResult = filterResult;
    }
  }

  // componentDidMount() {
  //   const self = this;
  //   window.addEventListener('resize', self.onLoad);
  // }
  //
  // componentWillUnmount() {
  //   const self = this;
  //   window.removeEventListener('resize', self.onLoad);
  // }

  render() {
    const { pageSrc } = this.props;

    return (
      <iframe
        style={{"height":this.state.iFrameHeight}}
        onLoad={this.onLoad}
        ref="iframe"
        src={pageSrc}
        width="100%"
        height={this.state.iFrameHeight}
        scrolling="no"
        frameBorder="0"
      />
    );
  }
}
