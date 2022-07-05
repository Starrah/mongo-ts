import {Schema} from 'mongoose'

/* Should pass <TypedSchemaClass> as generic type
* eg: class User implements OnSchemaBound<User> */
export interface OnSchemaBound<T> {
    onSchemaBound(schema: Schema<T>): void
}