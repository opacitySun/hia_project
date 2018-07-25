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
        pageSrc="https://ant.design/docs/react/introduce-cn"
      />
    )
  }
}
