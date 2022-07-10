import {Schema} from "mongoose";
import {Ctor, isTypedSchema, propertyPrintName, Schema_Types_Map, SchemaFunctions} from "../../models/internal";
import {MetaAgent} from "../../helpers";

function getSchemaFunctions(metadataKey: "schemaMethods" | "schemaStatics", ctor: Ctor) {
    const names = Object.keys(MetaAgent.get(metadataKey, ctor) ?? {})
    const target = metadataKey === "schemaStatics" ? ctor : ctor.prototype
    const result: any = {}
    for (const name of names) {
        if (!target[name]) throw new Error(`On ${propertyPrintName(ctor, name)}: function staticity error! @Method must be used on non-static method, while @Static must be used on static method!`)
        result[name] = target[name]
    }
    return result
}

type ToSchemaDefinitionReturns<C extends Ctor> = { schemaDefinitions: ConstructorParameters<typeof Schema<InstanceType<C>>>[0], functions: SchemaFunctions<C> }

export function toSchemaDefinition<C extends Ctor>(typedSchemaClass: C): ToSchemaDefinitionReturns<C> {
    if (!isTypedSchema(typedSchemaClass)) throw new Error(`Class ${typedSchemaClass.constructor.name} is not TypedSchema. Did you forget to add @TypedSchema on it?`)
    const schemaDefinitions: any = {}
    const schemaKeys = Object.keys(MetaAgent.get("schemaKeys", typedSchemaClass) ?? {})
    if (schemaKeys.length <= 0) throw new Error(`No property is found on class ${typedSchemaClass.constructor.name}. Did you forget to add decorators on properties, such as @Prop, @Property, @ArrayOf, @MapOf, @Enum, @Ref, @ArrayRef?`)
    for (const key of schemaKeys) {
        const definition = MetaAgent.get("schemaDefinitions", typedSchemaClass, key)
        let type = definition.type
        const ofType = MetaAgent.get("ofType", typedSchemaClass, key)
        if (!type) throw new Error(`No SchemaType can be inferred from ${propertyPrintName(typedSchemaClass, key)}. Did you forget to add type-inferring decorators such as @Prop, @Property, @ArrayOf, @MapOf, @Enum, @Ref, @ArrayRef?`)
        else if (type === Schema.Types.Array) {
            if (ofType) type = [ofType]
            else throw new Error(`You should use @ArrayOf or @Prop+@Of for array property ${propertyPrintName(typedSchemaClass, key)}.`)
        } else if (type === Schema_Types_Map()) {
            if (ofType) definition.of = ofType
            if (!definition.of) throw new Error(`You should use @MapOf or @Prop+@Of for map property ${propertyPrintName(typedSchemaClass, key)}.`)
        }
        definition.type = type
        schemaDefinitions[key] = definition
    }
    const functions = {
        methods: getSchemaFunctions("schemaMethods", typedSchemaClass),
        statics: getSchemaFunctions("schemaStatics", typedSchemaClass)
    }
    // call hook
    if (typeof typedSchemaClass.prototype.onConstructDefinitions === 'function') {
        typedSchemaClass.prototype.onConstructDefinitions(schemaDefinitions, functions);
    }
    return {schemaDefinitions, functions}
}
