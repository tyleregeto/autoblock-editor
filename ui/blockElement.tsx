import React from 'react';
import { Block, BlockType } from '../core/block';
import { DocumentApi } from '../core/doc';
import { getBlockTypeName } from '../core/utils';
import ImageBlock from './blockTypes/imageBlock';
import ValueBlock from './blockTypes/valueBlock';

interface BlockElementProps {
    block: Block;
    api: DocumentApi;
}

export default function BlockElement({ block, api }: BlockElementProps): JSX.Element {
    function renderSubView() {
        switch (block.type) {
            case BlockType.Value:
                return <ValueBlock api={api} {...block} />;
            case BlockType.Image:
                return <ImageBlock api={api} {...block} />;
        }

        return null;
    }

    function deleteBlock() {
        api.deleteBlock(block.id);
    }

    return <div className="ab-block">
        <div className="ab-block-controls">
            <div className="ab-block-type-label">Block Type: {getBlockTypeName(block.type)}</div>
            <button onClick={deleteBlock}>delete</button>
        </div>
        {renderSubView()}
    </div>;
}