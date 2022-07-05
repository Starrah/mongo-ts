
import { expect } from 'chai';
import { Schema } from 'mongoose';
import { 
    Prop, Enum, Required ,TypedSchema, OnConstructDefinitions, toSchema, Match
} from "../../../lib";

enum GenderEnums { 'g', 'f', 'n'}
const enumKeys = ((eType) => Object.values(eType).filter(e => typeof e == 'string') as string[] );

@TypedSchema({options: { timestamps: true } })
class PersonalData implements OnConstructDefinitions {
    
    @Prop() 
    @Required()  
        nickname: string;

    @Prop({unique:true, lowercase:true, trim:true }) 
    @Required('email is required') @Match(/^[\w\.-]+@[\w-]+\.[\w\.-]+$/)
        email: string;

    @Prop() date_of_birth: Date;

    @Enum(enumKeys(GenderEnums)) gender: GenderEnums;

    @Prop() profile_photo: string;

    onConstructDefinitions(def, func) {

          // console.log(JSON.stringify(def, (k, v) => (typeof v == 'function'? `@func:${v.name}` : v), 2));

          const personal_data_definitions = def;
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
  
    }
}



describe('Composed Decorators mapping', function() {
    it('should map all composed decorators properties as expected', function() {
        const PersonalDataSchema = toSchema<typeof PersonalData, PersonalData>(PersonalData);  
    })
});