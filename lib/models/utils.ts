import {PropertyDefinition} from "./internal";
import {MetaAgent} from "../helpers";

export type SubType<Base, Condition> = Pick<Base, { [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]>;

export type Ctor<T = any> = new(...args: any[]) => T;

export function isTypedSchema(type: Function) {
    return MetaAgent.has("schemaOptions", type)
}

export function propertyPrintName(targetPrototype: object, propertyName: string) {
    return `${targetPrototype.constructor.name}.${propertyName}`
}

export function ensureNoTypeFieldInPropertyDefinition(decoratorName: string, definition: Partial<PropertyDefinition>, targetPrototype: object, propertyName: string) {
    if (definition.type !== undefined)
        throw new Error(`SchemaTypeOptions (at ${propertyPrintName(targetPrototype, propertyName)}) should not have 'type' field. If you do want to manually specify the type for this property, please use @Property instead of @${decoratorName}.`)
}

export function warnInDecorator(message: string) {
    throw new Error(`Error in Decorator: ${message}`) // TODO 改为warning或静默？
}
