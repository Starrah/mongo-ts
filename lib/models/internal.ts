import {SchemaTypeOptions} from "mongoose";
import {Ctor, SubType} from "./utils";

export interface PropertyDefinition<T = any> extends SchemaTypeOptions<T> {
    type: never;
}

export type SchemaDefinitions<T> = { [path in keyof T]: any }

export type MethodsInClass<C extends Ctor> = SubType<InstanceType<C>, Function>
export type StaticsInClass<C extends Ctor> = SubType<C, Function>

export type SchemaFunctions<C extends Ctor> = {
    methods: MethodsInClass<C>,
    statics: StaticsInClass<C>
}

export * from './utils';
