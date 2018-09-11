import React, { PureComponent } from "react";
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.less';

export default class Iframe extends PureComponent {
  state = {
    iFrameHeight: '200px',
    loadingStyle:'block'
  };

  onLoad = () => {
    const obj = ReactDOM.findDOMNode(this);
    this.setState({
      "iFrameHeight":  obj.children[1].contentWindow.parent.document.body.scrollHeight + 'px',
      "loadingStyle":'none'
    });
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
      <div className={styles.iFrameDiv} style={{"height":this.state.iFrameHeight}}>
        <Icon type="loading" theme="outlined" className={styles.loadingIcon} style={{display:this.state.loadingStyle}} />
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
      </div>
    );
  }
}
