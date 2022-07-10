import {ensureNoTypeFieldInPropertyDefinition, PropertyDefinition} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {handleProvidedType} from "../../../infer-type";
import {Schema_Types_Map} from "../../../../helpers/compability";

export function MapOf(type: any, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('MapOf', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefinition('ArrayOf', definition, targetPrototype, propertyName)
        return {
            type: Schema_Types_Map(),
            definition: {...definition, of: handleProvidedType(type)}
        }
    });
}
