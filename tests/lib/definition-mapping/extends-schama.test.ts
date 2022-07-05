import { expect } from 'chai';
import { Method, Prop, TypedSchema, Enum, toSchema, OnConstructDefinitions } from '../../../lib/core'

const USER_CAPABILITIES = ['UPDATE', 'DELETE', 'UPDATE_DELETE'];

@TypedSchema()
class BaseUser {
    @Prop() name: string;
    @Prop() email: string;
    @Prop() img: string;
    @Prop() hash: string;
    @Prop() salt: string;

    @Method() getEmail() {
        return this.email;
    }
}

@TypedSchema()
class Admin extends BaseUser implements OnConstructDefinitions {
    @Prop() role: number;
    @Enum(USER_CAPABILITIES) capabilities: string;


    // hook - run after the schema definitions been constructed (before the schema creation)
    onConstructDefinitions(schemaDef: object, functions: object) {

        expect(schemaDef).to.have.all.keys([
            'name', 'email', 'img', 'hash', 
            'salt', 'role', 'capabilities'
        ]);

        expect(functions).to.have.all.keys(['methods']);
        expect(functions['methods']).to.have.all.keys(['getEmail']);
    }


}


describe('toSchema function', function() {
    it('schema definitions extend the base class schema definitions.', function() {
        const AdminSchema = toSchema<typeof Admin, Admin>(Admin);
    })
})