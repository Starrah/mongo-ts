import {Schema} from 'mongoose';
import {PropertyDefinition} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {IDCtors} from "./ref";

export function ArrayRef(modelRefName: string, definition: Partial<PropertyDefinition> = {}, type: IDCtors = Schema.Types.ObjectId) {
    return createPropertyDecorator('ArrayRef', () => {
        if (definition.type) type = definition.type // `type` specified in definition has higher priority
        return {
            type: Array.isArray(type) ? type : [{type, ref: modelRefName}],
            definition
        }
    });
}
