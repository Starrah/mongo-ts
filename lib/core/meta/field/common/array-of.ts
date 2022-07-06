import {ensureNoTypeFieldInPropertyDefination, PropertyDefinition} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {handleProvidedType} from "../../../infer-type";

export function ArrayOf(type: any, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('ArrayOf', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefination('ArrayOf', definition, targetPrototype, propertyName)
        return {
            type: [handleProvidedType(type)],
            definition
        }
    });
}
