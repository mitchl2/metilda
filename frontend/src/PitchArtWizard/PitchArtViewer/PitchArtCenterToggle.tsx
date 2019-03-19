import * as React from "react";
import "../GlobalStyling.css";
import {ChangeEvent} from "react";

interface Props {
    showVerticallyCentered: boolean,
    handleInputChange: (event: ChangeEvent) => void
}

class PitchArtCenterToggle extends React.Component<Props> {
    render() {
        return (
            <div className="metilda-pitch-art-container-control-list-item">
                <div className="top-label">
                    <label>Vertically Center</label>
                </div>
                <div className="switch">
                    <label>
                        No
                        <input type="checkbox"
                               checked={this.props.showVerticallyCentered}
                               onChange={this.props.handleInputChange}
                               name="showVerticallyCentered"/>
                        <span className="lever"></span>
                        Yes
                    </label>
                </div>
            </div>
        );
    }
}

export default PitchArtCenterToggle;