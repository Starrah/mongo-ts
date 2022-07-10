import * as mongoose from 'mongoose'
import {toSchema} from './index';
import {Ctor, MethodsInClass, StaticsInClass} from "../../models/internal";
import {Model} from "../../helpers/compability";

type PreModelCreationFunc<T> = (scheme: mongoose.Schema<T>) => void;

export function toModel<C extends Ctor, TQueryHelpers = {}, TOverrides = {}, TVirtuals = {},
    TInstanceMethods = MethodsInClass<C>, TStaticMethods = StaticsInClass<C>,
    M extends mongoose.Model<InstanceType<C>> = Model<InstanceType<C>, TQueryHelpers, TInstanceMethods & TOverrides, TVirtuals> & TStaticMethods>
(typedSchemaClass: C, modelName: string, preModelCreation?: PreModelCreationFunc<InstanceType<C>>): M {
    return toModelWith(mongoose.connection, typedSchemaClass, modelName, preModelCreation)
}

export function toModelWith<C extends Ctor, TQueryHelpers = {}, TOverrides = {}, TVirtuals = {},
    TInstanceMethods = MethodsInClass<C>, TStaticMethods = StaticsInClass<C>,
    M extends mongoose.Model<InstanceType<C>> = Model<InstanceType<C>, TQueryHelpers, TInstanceMethods & TOverrides, TVirtuals> & TStaticMethods>
(connection: mongoose.Connection, typedSchemaClass: C, modelName: string, preModelCreation?: PreModelCreationFunc<InstanceType<C>>): M {
    const schema = toSchema<C, TQueryHelpers, TOverrides, TVirtuals, TInstanceMethods, TStaticMethods, M>(typedSchemaClass);
    if (preModelCreation) preModelCreation(schema);
    return connection.model<InstanceType<C>, M>(modelName, schema);
}
