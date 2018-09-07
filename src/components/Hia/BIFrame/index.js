import React, {Component, Fragment} from 'react';
import FilterGroup from 'components/Hia/FilterGroup';
import Iframe from "components/Hia/Iframe";
import styles from './index.less';


const prefix = "http://192.168.36.166:7788/#/dashboardManager/DashboardModel/iframe";

const filterGroup = ["p_year_code", "p_month_code", "p_season_code", "p_half_year_code", "area_code", "hosp_code",
  "belong_to_code", "hosp_grade_code", "hosp_type_code", "bed_scale_code"];

export default class BIFrame extends Component {
  state = {
    url: "",
  };


  componentDidMount() {

  }

  getDimensions = (vals) => {
    if (vals.p_month_code) {
      return ["year_month_code"];
    } else if (vals.p_season_code) {
      return ["year_season_code"];
    } else if (vals.p_half_year_code) {
      return ["year_half_year_code"];
    } else {
      return ["year_code"];
    }
  };

  getParameters = (vals) => {
    return filterGroup.filter(props => vals[props]).map((props) => Object.assign({}, {
      "fieldName": props,
      "dataType": "string",
      "operation": "=",
      "values": vals[props],
    }));
  };

  getJsonParam = (vals) => {
    return JSON.stringify({parameters: this.getParameters(vals), dimensions: this.getDimensions(vals)});
  };

  changeUrl = (vals) => {
    console.log(vals);
    this.setState({url: `${prefix}/${this.props.dashboardId}/${this.getJsonParam(vals)}`});
  };

  render() {
    console.log(`url is ${this.state.url}`);

    return (
      <Fragment>
        <section className={styles['two-level-top']} />
        <section className={styles['two-level-content']}>
          <FilterGroup
            onChange={this.changeUrl}
            rowTypes={['timeSelect', 'region', 'medicalInstitution']}
          />

          <div style={{marginTop: '20px'}}>
            <Iframe
              pageSrc={this.state.url}
            />
          </div>
        </section>
      </Fragment>
    )
  }
}
