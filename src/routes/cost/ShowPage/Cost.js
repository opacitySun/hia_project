import React, { PureComponent } from "react";
import { connect } from "dva";
import Iframe from "components/Iframe";

@connect(({ iframe, loading }) => ({
  iframe
}))

export default class Cost extends PureComponent {
  render() {
    return (
      <Iframe
        pageSrc="https://www.jianshu.com/p/21f8ed30e761"
      />
    )
  }
}
