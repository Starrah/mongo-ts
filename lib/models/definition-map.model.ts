import {PropertyDefinition} from "./internal";

export interface FieldDefinition {
    generator?: (name: string, type: Function) => PropertyDefinition,
    definition: Partial<PropertyDefinition>,
}

export interface DefinitionMap {
    byDecorator: { [key: string]: FieldDefinition },
    byType: { [key: string]: FieldDefinition },
    byField: { [key: string]: FieldDefinition },
}


