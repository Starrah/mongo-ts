import * as mongoose from 'mongoose'
import {toSchema} from './index';
import {Ctor} from "../../models/utils";

type PreModelCreationFunc<T> = (scheme: mongoose.Schema<T>) => void;

export function toModel<C extends Ctor>(
    typedSchemaClass: C,
    modelName: string,
    preModelCreation?: PreModelCreationFunc<InstanceType<C>>
) {
    return toModelWith(mongoose.connection, typedSchemaClass, modelName, preModelCreation)
}

export function toModelWith<C extends Ctor>(
    connection: mongoose.Connection,
    typedSchemaClass: C,
    modelName: string,
    preModelCreation?: PreModelCreationFunc<InstanceType<C>>
) {
    const schema = toSchema(typedSchemaClass);
    if (preModelCreation) preModelCreation(schema);
    return connection.model<InstanceType<C>>(modelName, schema);
}
