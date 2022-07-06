import {MetaAgent} from "../../../helpers";
import {warnInDecorator} from "../../../models/utils";

export function Method() {
    return (targetPrototype: object, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
        if (!MetaAgent.has("schemaOptions", targetPrototype)) {
            const o = {};
            o[propertyName] = true
            MetaAgent.merge("schemaMethods", o, targetPrototype)
        } else warnInDecorator(`class ${targetPrototype.constructor.name} already processed! (detected when processing @Method)`)
        return propertyDesciptor;
    }
}
