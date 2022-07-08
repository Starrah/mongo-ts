import {ensureNoTypeFieldInPropertyDefination, PropertyDefinition} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {checkIdType, IDTypes, inferIdType} from "../../../infer-type";

/**
 * Decorator that define a ref property by a provided model name.
 * A ref property saves the _id for another document in another model, and can be populated.
 * See https://mongoosejs.com/docs/populate.html for details and usage.
 *
 * Note: you should use `import {Types} from 'mongoose'` and `Types.ObjectId` to define a property with type ObjectId.
 * Using `import {ObjectId} from 'mongoose'` **is wrong**, since it is only a TS type, not a class.
 * @param modelRefName the name of the model which this ref property references.
 * @param IDType the actual type saved in the database, or equivalent, the type of _id in the referenced model. Supported values: ObjectId, String, Number, Buffer. Default: undefined, means that the type should be inferred from TS definition.
 * @param definition the extra definition. Default: {}
 */
export function Ref(modelRefName: string, IDType?: IDTypes, definition: Partial<PropertyDefinition> = {},) {
    return createPropertyDecorator('Ref', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefination('Ref', definition, targetPrototype, propertyName)
        if (!IDType) IDType = inferIdType(targetPrototype, propertyName)
        checkIdType(IDType, targetPrototype, propertyName)
        return {
            type: IDType,
            definition: {...definition, ref: modelRefName}
        }
    })
}
