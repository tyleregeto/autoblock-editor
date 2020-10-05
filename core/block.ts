export enum BlockType {
    None,
    Value,
    Text,
    List,
    Image,
}

export interface Block {
    id: string;
    type: BlockType;
    sortOrder: number;
    children: Array<Block>;
    attributes: BlockAttributes;
}

export interface BlockAttributes {
    src?: string;
    value?: number | string | boolean;
    width?: number | string;
    height?: number | string;
    // value type applied to "ValueBlock", controls what type of UI is renders 
    valueType?: string;
    optionList?: Array<OptionValue>;
}
