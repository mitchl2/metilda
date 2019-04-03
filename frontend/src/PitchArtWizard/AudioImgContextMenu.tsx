import React from "react";
import {animation, Item, Menu, MenuProvider, Separator, Submenu, theme} from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";

interface Props {
    selectInterval: () => (void);
}

export default function AudioImgContextMenu(props: Props) {
    return (
        <Menu id="audio-img-menu" animation={animation.fade} theme={theme.light}>
            <Item onClick={props.selectInterval}>Select Interval</Item>
        </Menu>
    );
}
