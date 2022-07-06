import * as mongoose from 'mongoose'
import {Ctor, isTypedSchema, SchemaFunctions} from "../../models/internal";
import {MetaAgent} from "../../helpers";
import {toSchemaDefinition} from "./to-schema-definition";

function callHook(hookName: "onSchemaCached" | "onSchemaCreated" | "onSchemaBounded", typedSchemaClass: Ctor, schema: mongoose.Schema) {
    if (typeof typedSchemaClass.prototype[hookName] == 'function') {
        typedSchemaClass.prototype[hookName](schema);
    }
}

export function toSchema<C extends Ctor>(typedSchemaClass: C): mongoose.Schema<InstanceType<C>> {
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
    const schema = new mongoose.Schema<InstanceType<C>>(schemaDefinitions, schemaOptions);
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

