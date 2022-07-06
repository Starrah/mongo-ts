import {getDefaultDefinition} from '../../../field-definition-map';
import {MetaAgent} from "../../../helpers";
import {warnInDecorator} from "../../../models/utils";

export function createPropertyDecorator(decoratorName: string, cb: (targetPrototype: object, propertyName: string) => { type?: any, definition: any }) {
    return (targetPrototype: object, propertyName: string): void => {
        if (!MetaAgent.has("schemaOptions", targetPrototype)) {
            const {type, definition} = cb(targetPrototype, propertyName);

            const customDefaultDefinition = getDefaultDefinition(propertyName, type, decoratorName);
            const mergedDefinition = {...customDefaultDefinition, ...definition}
            if (type) mergedDefinition.type = type
            MetaAgent.merge("schemaDefinitions", mergedDefinition, targetPrototype, propertyName)
            const o = {};
            o[propertyName] = true
            MetaAgent.merge("schemaKeys", o, targetPrototype)
        } else warnInDecorator(`class ${targetPrototype.constructor.name} already processed! (detected when processing @${decoratorName})`)
    }
}