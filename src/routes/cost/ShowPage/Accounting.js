import React, { PureComponent } from "react";
import { connect } from "dva";
import Iframe from "components/Iframe";

@connect(({ iframe, loading }) => ({
  iframe
}))

export default class Accounting extends PureComponent {
  render() {
    return (
      <Iframe
        pageSrc="https://www.baidu.com"
      />
    )
  }
}
