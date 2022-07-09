import * as mongoose from 'mongoose'
import {Model} from 'mongoose'
import {toSchema} from './index';
import {Ctor, MethodsInClass, StaticsInClass} from "../../models/internal";

type PreModelCreationFunc<T> = (scheme: mongoose.Schema<T>) => void;

export function toModel<C extends Ctor, TQueryHelpers = {}, TOverrides = {},
    TInstanceMethods = MethodsInClass<C>, TStaticMethods = StaticsInClass<C>,
    M extends Model<InstanceType<C>> = Model<InstanceType<C>, TQueryHelpers, TInstanceMethods & TOverrides> & TStaticMethods>
(typedSchemaClass: C, modelName: string, preModelCreation?: PreModelCreationFunc<InstanceType<C>>): M {
    return toModelWith(mongoose.connection, typedSchemaClass, modelName, preModelCreation)
}

export function toModelWith<C extends Ctor, TQueryHelpers = {}, TOverrides = {},
    TInstanceMethods = MethodsInClass<C>, TStaticMethods = StaticsInClass<C>,
    M extends Model<InstanceType<C>> = Model<InstanceType<C>, TQueryHelpers, TInstanceMethods & TOverrides> & TStaticMethods>
(connection: mongoose.Connection, typedSchemaClass: C, modelName: string, preModelCreation?: PreModelCreationFunc<InstanceType<C>>): M {
    const schema = toSchema<C, TQueryHelpers, TOverrides, TInstanceMethods, TStaticMethods, M>(typedSchemaClass);
    if (preModelCreation) preModelCreation(schema);
    return connection.model(modelName, schema);
}
