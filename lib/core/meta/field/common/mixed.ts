import {ensureNoTypeFieldInPropertyDefination, PropertyDefinition} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {Schema} from "mongoose";

export function Mixed(type: any, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('Mixed', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefination('Mixed', definition, targetPrototype, propertyName)
        return {
            type: Schema.Types.Mixed,
            definition
        }
    });
}
