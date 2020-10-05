import { Document, DocumentApi } from './doc';
import * as Automerge from 'automerge';

declare global {
    interface Window { abEditorConnections: Array<LocalConnection>; }
}

export class LocalConnection {
    private _editor: DocumentApi

    constructor(editor: DocumentApi) {
        if (window.abEditorConnections === undefined) {
            window.abEditorConnections = [];
        }

        window.abEditorConnections.push(this);

        this.onChange = this.onChange.bind(this);

        this._editor = editor;
        this._editor.onChange.listen(this.onChange);
    }

    applyChanges(changes: Array<Automerge.Change>): void {
        this._editor.applyChanges(changes);
    }

    onChange(newDoc: Document): void {
        let changes = this._editor.getChanges();
        if (changes.length === 0) {
            return;
        }

        for (let i = 0; i < window.abEditorConnections.length; i++) {
            let c = window.abEditorConnections[i];
            if (c !== this) {
                c.applyChanges(changes);
            }
        }
    }
}