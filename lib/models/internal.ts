import {Document, SchemaOptions, SchemaTypeOptions} from 'mongoose';

export interface TypedSchemaConfig {
    options: SchemaOptions,
    extendsMeta?: any,
}

export type PropertyDefinition<T = any> = SchemaTypeOptions<T>

export type Doc<T> = T & Document<T>

export * from './utils';