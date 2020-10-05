import { Block, BlockAttributes, BlockType } from './block';
import { EventDispatcher } from './eventDispatcher';
import { Culture } from './localization';
import { createBlock } from './utils';
import * as Automerge from 'automerge';

export interface Document {
    documentId: number;
    title: Record<Culture, string>;
    blocks: Array<Block>;
}

export class DocumentApi {
    public onChange: EventDispatcher<Document>;
    public onExternalChanges: EventDispatcher<Document>;

    private _doc: Document;
    private _lastDocSnapshot: Document;

    constructor(doc: Document) {
        this.onChange = new EventDispatcher();
        this.onExternalChanges = new EventDispatcher();

        this._doc = Automerge.merge(Automerge.init(), doc);
        this._lastDocSnapshot = this._doc;
    }

    getDoc(): Document {
        return this._doc;
    }

    getChanges(): Array<Automerge.Change> {
        let changes = Automerge.getChanges(this._lastDocSnapshot, this._doc);
        this._lastDocSnapshot = this._doc;
        return changes;
    }

    applyChanges(changes: Array<Automerge.Change>): void {
        this._doc = Automerge.applyChanges(this._doc, changes);

        console.log('apply changes', changes);

        this.onExternalChanges.fire(this._doc);
    }

    addBlock(): void {
        this._doc = Automerge.change(this._doc, 'Add block', doc => {
            doc.blocks.push(createBlock(BlockType.None));
        });

        this.onChange.fire(this._doc);
    }

    deleteBlock(blockId: string): void {
        this._doc = Automerge.change(this._doc, 'Add block', doc => {
            let blockIndex = doc.blocks.findIndex(b => b.id === blockId);

            if (blockIndex !== -1) {
                doc.blocks.splice(blockIndex, 1);
            }
        });

        this.onChange.fire(this._doc);
    }

    updateTitle(culture: Culture, value: string): void {
        this._doc = Automerge.change(this._doc, 'Add block', doc => {
            doc.title[culture] = value;
        });

        this.onChange.fire(this._doc);
    }

    applyAttributes(blockId: string, a: BlockAttributes): void {
        this._doc = Automerge.change(this._doc, 'Update block attributes', doc => {
            let block = doc.blocks.find(b => b.id === blockId);

            if (!block) {
                return;
            }

            Object.assign(block.attributes, a);
        });

        this.onChange.fire(this._doc);
    }
}
