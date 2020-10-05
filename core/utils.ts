import { Block, BlockAttributes, BlockType } from './block';
import { Document } from './doc';
import newUid from './uid';

export function createNewDoc(): Document {
    return {
        documentId: 1,
        // TODO title would be a automerge.Text instance per culture
        title: { en: '', fr: '' },
        blocks: []
    };
}

export function createBlock(type: BlockType, attributes?: BlockAttributes): Block {
    // never re-order the list, only adjust the sort orders. Display order is a display problem, not data
    // we just need to sort consistetly if two blocks the the same sort order. Could have an ID value for this?

    // TODO blocks should have a Lamport like timestamp/id to uniquely identify them, and can be a sort ite breaker
    return {
        id: newUid(),
        type: type ?? BlockType.None,
        sortOrder: 0,
        attributes: attributes ?? {}, // img src would be here, heading might have weight
        children: [], // heading could have a single child, that is text? List item would have a child text. Maybe also a checkbox.
    };
}

let blockTypeNames = {
    [BlockType.None]: 'None',
    [BlockType.Value]: 'Value',
    [BlockType.Text]: 'Text',
    [BlockType.List]: 'List',
    [BlockType.Image]: 'Image',
};

export function getBlockTypeName(type: BlockType): string {
    return blockTypeNames[type] ?? 'Unknown';
}