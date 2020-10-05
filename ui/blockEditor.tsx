import BlockElement from './blockElement';
import React, { useState, ChangeEvent } from 'react';
import { Document, DocumentApi } from '../core/doc';
import { LocalConnection } from '../core/localConnection';

interface BlockEditorProps {
    initialDoc: Document;
}

function useDocumentApi(initialDoc: Document): [Document, DocumentApi] {
    let apiRef = React.useRef<DocumentApi>(null);
    let [doc, updateDoc] = useState<Document>(null);

    if (apiRef.current == null) {
        apiRef.current = new DocumentApi(initialDoc);

        new LocalConnection(apiRef.current);

        apiRef.current.onChange.listen(function (newDoc: Document) {
            updateDoc(newDoc);
        });

        apiRef.current.onExternalChanges.listen(function (newDoc: Document) {
            updateDoc(newDoc);
        });
    }

    let api = apiRef.current;
    return [doc ?? apiRef.current.getDoc(), api];
}

export default function BlockEditor({ initialDoc }: BlockEditorProps): JSX.Element {
    let [doc, api] = useDocumentApi(initialDoc);

    function onAddBlockClick() {
        api.addBlock();
    }

    function onTextInput(e: ChangeEvent<HTMLInputElement>) {
        api.updateTitle('en', e.target.value);
    }

    return <div>
        <div><input className="ab-doc-title-input" type="text" value={doc.title.en} onChange={onTextInput} /></div>
        <div className="ab-block-list">
            {doc.blocks.map(b => <BlockElement key={b.id} block={b} api={api} />)}
        </div>
        <button onClick={onAddBlockClick}>Add block</button>
    </div>;
} 