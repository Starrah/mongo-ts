import * as mongoose from 'mongoose'
import {Model} from 'mongoose'
import {toSchemaDefinition} from "./to-schema-definition";
import {Ctor, isTypedSchema, MethodsInClass, SchemaFunctions, StaticsInClass} from "../../models/internal";
import {MetaAgent} from "../../helpers";

function callHook<T>(hookName: "onSchemaCached" | "onSchemaCreated" | "onSchemaBounded", typedSchemaClass: Ctor, schema: mongoose.Schema<T>) {
    if (typeof typedSchemaClass.prototype[hookName] == 'function') {
        typedSchemaClass.prototype[hookName](schema);
    }
}

export function toSchema<C extends Ctor, TQueryHelpers = {}, TOverrides = {}, TVirtuals = {},
    TInstanceMethods = MethodsInClass<C>, TStaticMethods = StaticsInClass<C>,
    M extends Model<InstanceType<C>> = Model<InstanceType<C>, TQueryHelpers, TInstanceMethods & TOverrides, TVirtuals> & TStaticMethods>
(typedSchemaClass: C): mongoose.Schema<InstanceType<C>, M, TInstanceMethods, TQueryHelpers, TVirtuals> {
    if (!isTypedSchema(typedSchemaClass)) throw new Error(`Class ${typedSchemaClass.constructor.name} is not TypedSchema. Did you forget to add @TypedSchema on it?`)
    const cache = MetaAgent.get("cachedSchema", typedSchemaClass)
    if (cache) {
        callHook("onSchemaCached", typedSchemaClass, cache)
        return cache
    }

    // generate definition
    const {schemaDefinitions, functions} = toSchemaDefinition(typedSchemaClass)
    if (MetaAgent.get("verbose", typedSchemaClass)) console.log({schemaDefinitions, functions})

    // make Schema instance
    const schemaOptions = MetaAgent.get("schemaOptions", typedSchemaClass)
    const schema = new mongoose.Schema<InstanceType<C>, M, TInstanceMethods, TQueryHelpers, TVirtuals>(schemaDefinitions, schemaOptions);
    callHook("onSchemaCreated", typedSchemaClass, schema)

    // assign class method to the schema.
    assignSchemaFunctions(schema, functions);
    callHook("onSchemaBounded", typedSchemaClass, schema)

    MetaAgent.define("cachedSchema", schema, typedSchemaClass)
    return schema
}

function assignSchemaFunctions<C extends Ctor>(schema: mongoose.Schema<InstanceType<C>>, functions: SchemaFunctions<C>) {
    Object.keys(functions.methods).forEach(name => schema.method(name, functions.methods[name]))
    Object.keys(functions.statics).forEach(name => schema.static(name, functions.statics[name]))
}

