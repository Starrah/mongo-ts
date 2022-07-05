import {Schema} from 'mongoose'

/* Should pass <TypedSchemaClass> as generic type
* eg: class User implements OnSchemaCached<User> */
export interface OnSchemaCached<T> {
    onSchemaCached(schema: Schema<T>): void
}