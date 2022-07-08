import {inferMongooseType} from '../../infer-type'
import {ensureNoTypeFieldInPropertyDefinition, PropertyDefinition} from '../../../models/internal';
import {createPropertyDecorator} from './create-property-decorator';

export function Prop(definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('Prop', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefinition('Prop', definition, targetPrototype, propertyName)
        return {
            type: inferMongooseType(targetPrototype, propertyName),
            definition
        }
    })
}
