import {inferMongooseType} from '../../infer-type'
import {ensureNoTypeFieldInPropertyDefination, PropertyDefinition} from '../../../models/internal';
import {createPropertyDecorator} from './create-property-decorator';

export function Prop(definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('Prop', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefination('Prop', definition, targetPrototype, propertyName)
        return {
            type: inferMongooseType(targetPrototype, propertyName),
            definition
        }
    })
}
