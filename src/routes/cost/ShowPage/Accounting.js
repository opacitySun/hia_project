import React, { PureComponent } from "react";
import { connect } from "dva";
import Iframe from "components/Hia/Iframe";

@connect(({ iframe, loading }) => ({
  iframe
}))

export default class Accounting extends PureComponent {
  render() {
    const path = 'http://192.168.36.166:7777/#/dashboardManager/DashboardModel/iframe/115384225175175168/{"parameters":[{"fieldName":"p_year_code","dataType":"int","operation":"=","values":"2018"}],"dimensions":["year_code"]}';

    return (
      <Iframe
        pageSrc={path}
      />
    )
  }
}
