import {PropertyDefinition} from '../../../models/internal';
import {createPropertyDecorator} from './create-property-decorator';
import {handleProvidedType} from "../../infer-type";


export function Property(type: any, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('Property', () => {
        return {
            type: handleProvidedType(type),
            definition
        }
    })
}
