import {PropertyDefinition} from '../../../../models/internal';
import {getDesignType} from '../../../infer-type';
import {Schema} from 'mongoose';
import {createPropertyDecorator} from '../create-property-decorator';

export function Enum(enumOrKeys: Array<string> | object, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('Enum', (targetPrototype: object, propertyName: string) => {
        let type = getDesignType(targetPrototype, propertyName) === Array ? [Schema.Types.String] : Schema.Types.String;
        if (definition.type) type = definition.type // `type` specified in definition has higher priority
        const enumKeys = Array.isArray(enumOrKeys) ? enumOrKeys : Object.values(enumOrKeys).filter(v => typeof v === "string")
        return {
            type,
            definition: {...definition, enum: enumKeys}
        }
    });
}
