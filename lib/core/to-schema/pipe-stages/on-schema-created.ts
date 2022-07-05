import {Schema} from 'mongoose'

/* Should pass <TypedSchemaClass> as generic type
* eg: class User implements OnSchemaCreated<User> */
export interface OnSchemaCreated<T> {
    onSchemaCreated(schema: Schema<T>): void
}