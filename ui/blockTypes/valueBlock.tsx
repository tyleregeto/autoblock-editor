import React from 'react';
import { BlockAttributes } from '../../core/block';
import { DocumentApi } from '../../core/doc';

interface ValueBlockProps {
    attributes: BlockAttributes;
    api: DocumentApi;
}

export default function ValueBlock({ attributes }: ValueBlockProps): JSX.Element {
    return <div className="ab-block-subview ab-block-subview-value">
        {attributes.value?.toString() ?? 'No value'}
    </div>;
}