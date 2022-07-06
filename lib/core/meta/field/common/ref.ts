import {Schema, Types} from 'mongoose';
import {PropertyDefinition} from '../../../../models/external';
import {createPropertyDecorator} from '../create-property-decorator';

export type IDCtors = typeof Schema.Types.ObjectId | typeof Types.ObjectId |
    typeof String | typeof Number | typeof Buffer

export function Ref(modelRefName: string, definition: Partial<PropertyDefinition> = {}, type: IDCtors = Schema.Types.ObjectId) {
    return createPropertyDecorator('Ref', () => {
        if (definition.type) type = definition.type // `type` specified in definition has higher priority
        return {
            type,
            definition: {...definition, ref: modelRefName}
        };
    })
}
