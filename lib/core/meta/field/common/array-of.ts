import {ensureNoTypeFieldInPropertyDefinition, PropertyDefinition} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {handleProvidedType} from "../../../infer-type";

export function ArrayOf(type: any, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('ArrayOf', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefinition('ArrayOf', definition, targetPrototype, propertyName)
        return {
            type: [handleProvidedType(type)],
            definition
        }
    });
}
