import React, { PureComponent } from "react";
import { connect } from "dva";
import Iframe from "components//Hia/Iframe";

@connect(({ iframe, loading }) => ({
  iframe
}))

export default class Cost extends PureComponent {
  render() {
    return (
      <Iframe
        pageSrc="http://fanyi.baidu.com/?aldtype=16047#auto/zh"
      />
    )
  }
}
