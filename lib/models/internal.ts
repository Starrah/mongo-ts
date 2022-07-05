import {Document, SchemaOptions, SchemaTypeOptions} from 'mongoose';
import {Ctor, SubType} from "./utils";

export interface TypedSchemaConfig {
    options: SchemaOptions,
    extendsMeta?: any,
}

export type PropertyDefinition<T = any> = SchemaTypeOptions<T>

export type Doc<T> = T & Document<T>

export type SchemaDefinitions<T> = { [path in keyof T]: any }

export type SchemaFunctions<C extends Ctor> = {
    methods?: SubType<InstanceType<C>, Function>,
    statics?: SubType<C, Function>
}

export * from './utils';