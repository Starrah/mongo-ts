import {MetaAgent} from "../../../helpers";
import {warnInDecorator} from "../../../models/utils";

export function Static() {
    return (targetPrototype: object, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
        if (!MetaAgent.has("schemaOptions", targetPrototype)) {
            const o = {};
            o[propertyName] = true
            MetaAgent.merge("schemaStatics", o, targetPrototype)
        } else warnInDecorator(`class ${targetPrototype.constructor.name} already processed! (detected when processing @Static)`)
        return propertyDesciptor;
    }
}
