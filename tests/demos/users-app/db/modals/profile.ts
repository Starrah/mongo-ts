import { TypedSchema, Prop, Method, Enum, toModel, OnConstructDefinitions } from './../../../../../lib/core'

@TypedSchema()
class Profile {
    @Prop() firstName: string;
    @Prop() lastName: string;
    @Prop() address: string;
    @Prop() age: number;
    @Prop() img: string;
}

export { Profile };