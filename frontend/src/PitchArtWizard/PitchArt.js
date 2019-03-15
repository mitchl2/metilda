import React, {Component} from 'react';
import './PitchArt.css';
import Konva from 'konva';
import { Stage, Layer, Rect, Line, Circle, Group} from 'react-konva';
import PitchArtDrawingWindow from "./PitchArtDrawingWindow";
import Recorder from 'recorder-js';


class PitchArt extends React.Component {
    state = {};

    constructor(props) {
        super(props);

        this.saveImage = this.saveImage.bind(this);
        this.playPitchArt = this.playPitchArt.bind(this);
        this.createPitchArt = this.createPitchArt.bind(this);
        this.toggleRecord = this.toggleRecord.bind(this);
        this.recorder = null;
    }

    saveImage() {
        this.hiddenRef.saveImage();
    }

    playPitchArt() {
        this.visibleRef.playPitchArt();
    }

    createPitchArt(isVisible, refName) {
        return (<PitchArtDrawingWindow
                        ref={node => { this[refName] = node}}
                        isVisible={isVisible}
                        width={this.props.width}
                        height={this.props.height}
                        minPitch={this.props.minPitch}
                        maxPitch={this.props.maxPitch}
                        uploadId={this.props.uploadId}
                        manualPitchChange={this.props.manualPitchChange}
                        maxPitchIndex={this.props.maxPitchIndex}
                        showAccentPitch={this.props.showAccentPitch}
                        showSyllableText={this.props.showSyllableText}
                        showVerticallyCentered={this.props.showVerticallyCentered}
                        showPitchArtLines={this.props.showPitchArtLines}
                        showLargeCircles={this.props.showLargeCircles}
                        letters={this.props.letters}/>);
    }

    toggleRecord() {
        const audioContext =  new (window.AudioContext || window.webkitAudioContext)();

        // TODO: Use state to keep track of when audio is/is not recording
        if (this.recorder == null) {
            this.recorder = new Recorder(audioContext);
            navigator.mediaDevices.getUserMedia({audio: true})
              .then(stream => this.recorder.init(stream).then(() => this.recorder.start()))
              .catch(err => console.log('Uh oh... unable to get stream...', err));
        } else {
            let controller = this;
            this.recorder.stop().then((result) => {
                const formData = new FormData();
                console.log(result.blob);
                formData.append('file', result.blob);
                fetch(`/api/all-pitches`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(function(data) {
                    console.log(data);
                    controller.recorder = null;
                });
            });
        }
    }

    render() {
        let visiblePitchArt = this.createPitchArt(true, 'visibleRef');
        let hiddenPitchArt = this.createPitchArt(false, 'hiddenRef');

        return (
            <div>
                <div>
                    {visiblePitchArt}
                </div>
                <div className="hide">
                    {hiddenPitchArt}
                </div>
                <div id="metilda-pitch-art-btn-container">
                    <button className="waves-effect waves-light btn metilda-pitch-art-btn"
                            disabled={this.props.letters.length === 0}
                            onClick={this.toggleRecord}>
                        {this.recorder === null ? 'Record': 'Stop'}
                    </button>
                    <button className="waves-effect waves-light btn metilda-pitch-art-btn"
                            disabled={this.props.letters.length === 0}
                            onClick={this.playPitchArt}>
                        Play
                    </button>
                    <button className="waves-effect waves-light btn metilda-pitch-art-btn"
                            disabled={this.props.letters.length === 0}
                            onClick={this.saveImage}>
                        Save Image
                    </button>
                </div>
            </div>
        )
    }
}

export default PitchArt;