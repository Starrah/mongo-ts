import * as mongoose from 'mongoose'
import {toSchema} from '../to-schema';
import {Ctor} from "../../models/internal";

type PreModelCreationFunc<T> = (scheme: mongoose.Schema<T>) => void;

export function toModel<C extends Ctor>(
    TypedSchemeClass: C,
    modelName: string,
    preModelCreation?: PreModelCreationFunc<InstanceType<C>>
) {
    const schema = toSchema(TypedSchemeClass);
    if (preModelCreation) preModelCreation(schema);
    return mongoose.model(modelName, schema);
}

