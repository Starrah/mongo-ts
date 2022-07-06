import {ensureNoTypeFieldInPropertyDefination, PropertyDefinition, Schema_Types_Map} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {handleProvidedType} from "../../../infer-type";

export function MapOf(type: any, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('MapOf', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefination('ArrayOf', definition, targetPrototype, propertyName)
        return {
            type: Schema_Types_Map(),
            definition: {...definition, of: handleProvidedType(type)}
        }
    });
}
