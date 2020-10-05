import React from 'react';
import { BlockAttributes } from '../../core/block';
import { DocumentApi } from '../../core/doc';

interface ImageBlockProps {
    id: string;
    attributes: BlockAttributes;
    api: DocumentApi;
}

export default function ImageBlock({ id, attributes, api }: ImageBlockProps): JSX.Element {
    if (!attributes?.src) {
        // TODO a UI for setting it
        return <>No image specified</>;
    }

    function deleteImage() {
        api.applyAttributes(id, { 'src': '' });
    }

    function clearWidth() {
        api.applyAttributes(id, { 'width': '' });
    }

    return <div className="ab-block-subview ab-block-subview-image">
        <img src={attributes.src} width={attributes.width} onClick={deleteImage} />
        <div>
            <button onClick={deleteImage}>clear image</button>
            {attributes.width > 0 ? <button onClick={clearWidth}>clear image width</button> : null}
        </div>
    </div>;
}