import {HydratedDocument, SchemaTypeOptions, UnpackedIntersection} from 'mongoose';
import {Ctor, SubType} from "./utils";
import {MetaAgent} from "../helpers";

export interface PropertyDefinition<T = any> extends SchemaTypeOptions<T> {
    type: never;
}

export type Doc<T> = HydratedDocument<T>

export type Populated<T, TypeForRefFields> = UnpackedIntersection<T, TypeForRefFields>

export type SchemaDefinitions<T> = { [path in keyof T]: any }

export type SchemaFunctions<C extends Ctor> = {
    methods: SubType<InstanceType<C>, Function>,
    statics: SubType<C, Function>
}

export function isTypedSchema(type: Function) {
    return MetaAgent.has("schemaOptions", type)
}

export * from './utils';
