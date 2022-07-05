import {Ctor, SchemaDefinitions, SchemaFunctions} from "../../../models/internal";

/**
 * Should pass <TypedSchemaClass, typeof TypedSchemaClass> as generic type
 * eg: class User implements OnConstructDefinitions<User, typeof User>
 *
 * Since the type `SchemaDefinition` in mongoose is too complicated and not suitable for edit due to using joint type,
 * SchemaDefinitions<T>(i.e. {[path: keyof T]: any}) is used as the first parameter.
 * eg: onConstructDefinitions(schemaDefinitions: SchemaDefinitions<BaseUser>, functions?: SchemaFunctions<typeof BaseUser>) { ... }
 */
export interface OnConstructDefinitions<T, C extends Ctor<T> = Ctor<T>> {
    onConstructDefinitions(schemaDefinitions: SchemaDefinitions<T>, functions?: SchemaFunctions<C>): void
}