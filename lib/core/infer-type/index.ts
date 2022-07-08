import {Schema, Types} from 'mongoose';
import 'reflect-metadata'
import {Ctor, isTypedSchema, propertyPrintName, Schema_Types_Map} from "../../models/internal";
import {toSchema, toSchemaDefinition} from "../to-schema";

export function getDesignType(targetPrototype: object, propertyName: string): Function {
    const design_type = Reflect.getMetadata('design:type', targetPrototype, propertyName)
    if (design_type) {
        return design_type
    } else {
        throw new Error(`Failed to get metadata "design:type" for ${propertyPrintName(targetPrototype, propertyName)}. Did you forget to add {"emitDecoratorMetadata": true} in your tsconfig.json?`);
    }
}

function designTypeToMongooseType(type: Function, targetPrototype: object, propertyName: string) {
    switch (type) {
        case String:
        case Number:
        case Date:
        case Buffer:
        case Boolean:
            return type
        case Schema.Types.ObjectId:
        case Types.ObjectId:
            return Schema.Types.ObjectId
        case Array:
            return Schema.Types.Array
        case Map:
            return Schema_Types_Map()
        case Object:
            return Schema.Types.Mixed
        default:
            // for other classes, only those with @TypedSchema can be used as sub schema
            if (isTypedSchema(type)) return toSchema(<Ctor>type)
            else throw new Error(`Property ${propertyPrintName(targetPrototype, propertyName)} is with unsupported type ${type?.constructor?.name}. Did you forget to add @TypedSchema on the nested class?`)
    }
}

export function inferMongooseType(targetPrototype: object, propertyName: string) {
    return designTypeToMongooseType(getDesignType(targetPrototype, propertyName), targetPrototype, propertyName)
}

export function handleProvidedType(type: any) {
    // if the provided type is TypedSchema, call `toSchema` to process it.
    if (Array.isArray(type) && type.length == 1 && isTypedSchema(type[0])) {
        type = [toSchema(type[0])]
    } else if (isTypedSchema(type)) {
        type = toSchema(type)
    }
    return type;
}

const idTypes = [Schema.Types.ObjectId, Types.ObjectId, String, Number, Buffer]

export type IDTypes = typeof idTypes[number]

export function inferIdType(targetPrototype: object, propertyName: string): IDTypes {
    const type = getDesignType(targetPrototype, propertyName)
    switch (type) {
        case String:
        case Number:
        case Buffer:
            return <IDTypes>type
        case Schema.Types.ObjectId:
        case Types.ObjectId:
            return Schema.Types.ObjectId
        default:
            if (isTypedSchema(type)) {
                // when the design:type is another TypedSchema, see the corresponding schemaDefinitions:
                // if there is definition for _id, then use it; else, use ObjectId.
                const definition = toSchemaDefinition(<Ctor>type).schemaDefinitions
                return (<any>definition._id)?.type || definition._id || Schema.Types.ObjectId
            } else throw new Error(`the IDType for ref property ${propertyPrintName(targetPrototype, propertyName)} cannot be inferred. Please specify the IDType parameter manually, see the doc of @Ref for details.`)
    }
}

export function checkIdType(type, targetPrototype: object, propertyName: string) {
    if (idTypes.indexOf(type) === -1) throw new Error(`the IDType for ref property ${propertyPrintName(targetPrototype, propertyName)} is not supported. Only Types.ObjectId, String, Number, Buffer can be IDType.`)
}
