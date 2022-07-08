import {ensureNoTypeFieldInPropertyDefination, PropertyDefinition} from '../../../../models/internal';
import {createPropertyDecorator} from '../create-property-decorator';
import {checkIdType, IDTypes} from "../../../infer-type";

/**
 * Decorator that define an array of ref property by a provided model name.
 * A ref property saves the _id for another document in another model, and can be populated.
 * See https://mongoosejs.com/docs/populate.html for details and usage.
 *
 * Note: you should use `import {Types} from 'mongoose'` and `Types.ObjectId` to define a property with type ObjectId.
 * Using `import {ObjectId} from 'mongoose'` **is wrong**, since it is only a TS type, not a class.
 * @param modelRefName the name of the model which this ref property references.
 * @param IDType the actual type saved in the database, or equivalent, the type of _id in the referenced model. This parameter is **required**, since we cannot infer the ID type for an array. Supported values: ObjectId, String, Number, Buffer.
 * @param definition the extra definition. Default: {}
 */
export function ArrayRef(modelRefName: string, IDType: IDTypes, definition: Partial<PropertyDefinition> = {}) {
    return createPropertyDecorator('ArrayRef', (targetPrototype: object, propertyName: string) => {
        ensureNoTypeFieldInPropertyDefination('ArrayRef', definition, targetPrototype, propertyName)
        checkIdType(IDType, targetPrototype, propertyName)
        return {
            type: [{IDType, ref: modelRefName}],
            definition
        }
    })
}
