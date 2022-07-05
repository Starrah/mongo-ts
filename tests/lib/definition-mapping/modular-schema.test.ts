
import { expect } from 'chai';
import { Schema } from 'mongoose';
import { 
    Prop, Enum, ArrayOf, TypedSchema, toModel, OnConstructDefinitions, toSchema
} from "../../../lib";

enum GenderEnums { 'g', 'f', 'n'}
enum PaymentEnums { 'paypal' = 1, 'visa' = 2, 'master' = 3 }
const enumKeys = ((eType) => Object.values(eType).filter(e => typeof e == 'string') as string[] );

@TypedSchema({options: { timestamps: true } })
class PersonalData implements OnConstructDefinitions {
    @Prop() nickname: string;
    @Prop({required: 'email is required', unique:true, lowercase:true, trim:true, match: /^[\w\.-]+@[\w-]+\.[\w\.-]+$/}) 
    email: string;
    @Prop() date_of_birth: Date;
    @Enum(enumKeys(GenderEnums)) gender: GenderEnums;
    @Prop() profile_photo: string;

    onConstructDefinitions(def, func) {
        // console.log(JSON.stringify(def, (k, v) => (typeof v == 'function'? `@func:${v.name}` : v), 2));
    }
}

@TypedSchema({options: { timestamps: true } })
class MetaData {
    @Prop({default: false })  is_finished_on_boarding: boolean;
    @Prop({default: false }) is_finished_terms_of_use: boolean;
    @Prop({default: true }) is_send_notifications: boolean;
}

@TypedSchema({options: { timestamps: true } })
class Payment {
    @Enum(enumKeys(PaymentEnums)) subscription: PaymentEnums;
}

@TypedSchema({options: { timestamps: true } })
class User implements OnConstructDefinitions {
    @ArrayOf('string',  {unique: true, required: true}) uid: string[]
    @Prop() personal_data: PersonalData;
    @Prop() meta_data: MetaData;
    @Prop() payment_data: Payment;
    @Prop({default: 1}) status: number;

    onConstructDefinitions(def: any, func) {
        // console.log(JSON.stringify(def, (k, v) => (typeof v == 'function'? `@func:${v.name}` : v), 2));

        const { personal_data, meta_data, payment_data, uid, status } = def;

        // -- uid
        expect(uid).to.not.be.undefined;
        expect(uid.type).to.deep.equals([ {type: Schema.Types.String} ]);
        expect(uid).to.deep.include({ required: true, unique: true });

        // -- status
        expect(status).to.not.be.undefined;
        expect(status.type).to.deep.equals(Schema.Types.Number);
        expect(status).to.deep.include({ default: 1 });

        // -- personal_data
        expect(personal_data).to.not.be.undefined;
        expect(personal_data.type).to.be.instanceOf(Schema);
        expect(personal_data.type.$timestamps).to.not.be.undefined;
        const personal_data_definitions = personal_data.type.obj;
        expect(personal_data_definitions).to.have.keys(['nickname', 'email', 'date_of_birth', 'gender', 'profile_photo'])
        expect(personal_data_definitions.nickname.type).to.be.equals(Schema.Types.String);
        expect(personal_data_definitions.date_of_birth.type).to.be.equals(Schema.Types.Date);
        expect(personal_data_definitions.profile_photo.type).to.be.equals(Schema.Types.String);
        expect(personal_data_definitions.gender.type).to.be.equals(Schema.Types.String);
        expect(personal_data_definitions.gender.enum).to.have.all.members(["g", "f", "n"]);
        expect(personal_data_definitions.email.type).to.be.equals(Schema.Types.String);
        expect(personal_data_definitions.email).to.deep.include({
            required: 'email is required', unique: true, lowercase: true, trim: true, match: /^[\w\.-]+@[\w-]+\.[\w\.-]+$/
        });

        // -- meta_data
        expect(meta_data).to.not.be.undefined;
        expect(meta_data.type).to.be.instanceOf(Schema);
        expect(meta_data.type.$timestamps).to.not.be.undefined;
        const meta_data_definitions = meta_data.type.obj;
        expect(meta_data_definitions).to.have.keys(['is_finished_on_boarding', 'is_finished_terms_of_use', 'is_send_notifications'])
        expect(meta_data_definitions.is_finished_on_boarding.type).to.be.equals(Schema.Types.Boolean);
        expect(meta_data_definitions.is_finished_on_boarding.default).to.be.equals(false);
        expect(meta_data_definitions.is_finished_terms_of_use.type).to.be.equals(Schema.Types.Boolean);
        expect(meta_data_definitions.is_finished_terms_of_use.default).to.be.equals(false);
        expect(meta_data_definitions.is_send_notifications.type).to.be.equals(Schema.Types.Boolean);
        expect(meta_data_definitions.is_send_notifications.default).to.be.equals(true);

        // -- payment_data    
        expect(payment_data).to.not.be.undefined;
        expect(payment_data.type).to.be.instanceOf(Schema);
        expect(payment_data.type.$timestamps).to.not.be.undefined;
        const payment_data_definitions = payment_data.type.obj;
        expect(payment_data_definitions).to.have.keys(['subscription'])
        expect(payment_data_definitions.subscription.type).to.be.equals(Schema.Types.String);
        expect(payment_data_definitions.subscription.enum).to.have.all.members(['paypal', 'visa', 'master']);
    }
}



describe('Modular Schema mapping', function() {
    it('should map all sub-schemas properties as expected', function() {
        const UserSchema = toSchema<typeof User, User>(User);  
    })
});