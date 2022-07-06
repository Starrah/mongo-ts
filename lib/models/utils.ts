import {PropertyDefinition} from "./internal";
import {Schema} from "mongoose";

export type SubType<Base, Condition> = Pick<Base, { [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]>;

export type Ctor<T = any> = new(...args: any[]) => T;

export function propertyPrintName(targetPrototype: object, propertyName: string) {
    return `${targetPrototype.constructor.name}.${propertyName}`
}

export function ensureNoTypeFieldInPropertyDefination(decoratorName: string, definition: Partial<PropertyDefinition>, targetPrototype: object, propertyName: string) {
    if (definition.type !== undefined)
        throw new Error(`SchemaTypeOptions (at ${propertyPrintName(targetPrototype, propertyName)}) should not have 'type' field. If you do want to manually specify the type for this property, please use @Property instead of @${decoratorName}.`)
}

/* For compatibility with mongoose v4, Schema.Types.Map should be accessed from this function,
which will throw Error when there is no support for Map. */
export function Schema_Types_Map() {
    // @ts-ignore
    if (Schema.Types.Map) return Schema.Types.Map
    else throw new Error(`Your current mongoose version does not support schema type Map, you may consider to upgrade mongoose version to >5.1.0.`)
}

export function warnInDecorator(message: string) {
    throw new Error(`Error in Decorator: ${message}`) // TODO 改为warning或静默？
}