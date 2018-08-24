import React, { PureComponent } from "react";
import { connect } from "dva";
import Iframe from "components//Hia/Iframe";

@connect(({ newlogin, loading }) => ({
  newlogin,
  loading: loading.models.newlogin
}))
export default class WebIndex extends PureComponent {
  componentWillMount() {
    const search = this.props.location.search;
    if(search != '' && search.indexOf('token') > -1){
      const token = search.substring(7,search.length);
      this.props.dispatch({
        type: "newlogin/newlogin",
        payload: {
          token:token
        }
      }).then(() => {
        window.parent.location.href = '/';
      });
    }
  }

  render() {
    return (
      <Iframe
        pageSrc="http://www.baidu.com"
      />
    )
  }
}
