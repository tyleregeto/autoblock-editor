import { render } from 'react-dom';
import { createElement } from 'react';
import BlockEditor from './ui/blockEditor';
import { BlockType } from './core/block';
import { createBlock, createNewDoc } from './core/utils';
import { Document } from './core/doc';
import * as Automerge from 'automerge';

function buildStarterDoc() {
    let doc = createNewDoc();
    doc.title.en = 'My New Doc';
    doc.blocks.push(
        createBlock(BlockType.None),
        createBlock(BlockType.Value),
        createBlock(BlockType.Value, { value: true }),
        createBlock(BlockType.Image, { width: 200, src: 'http://tyleregeto.com/8a907bba-74b6-11e6-94ef-dfd590aa0c48-f1-inside.png' }),
    );

    // we are going to pass this to two editors, need to make sure they have thy are the same automerge document
    let d = Automerge.from(doc);
    return Automerge.save(d);
}

function initEditor(target: string, doc: Document) {
    let renderTarget = document.getElementById(target);
    render(createElement(BlockEditor, { initialDoc: doc }), renderTarget);
}

let d = buildStarterDoc();
initEditor('renderTarget', Automerge.load<Document>(d));
initEditor('renderTarget2', Automerge.load<Document>(d));