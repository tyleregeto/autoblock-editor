import { Block, BlockType } from "../../core/block";
import { getBlockTypeName } from "../../core/utils";
import React from 'react';

interface BlockTypePickerProps {
    type: BlockType;
    onChange: (type: BlockType) => void;
}

export default function BlockTypePicker(props: BlockTypePickerProps): JSX.Element {
    let options = [{ value: BlockType.None, label: getBlockTypeName(BlockType.None) }];

    return <select value={props.type}>
        {options}
    </select>;
}