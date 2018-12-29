import SwimmingPool from "./SwimmingPool";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        test: state
    };
}

export default connect(
    mapStateToProps
)(SwimmingPool);
