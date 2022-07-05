
import { expect } from 'chai';
import { Schema } from 'mongoose';
import { 
    Prop, Enum, Required ,TypedSchema, OnConstructDefinitions, toSchema, Match, ArrayOf, Property, Method, toModel
} from "../../../lib";


export const blogSchemaDef = {
    title:  { 
        type: String, 
        required: true 
    },
    author: String,
    body:   String,
    comments: { 
        type: [{ body: String, date: Date }], 
        default: [] 
    },
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
};





@TypedSchema() class BlogComments {
    @Prop() body: string;
    @Prop() date: Date;
}

@TypedSchema() class Blog {

    @Prop({ required: true }) title: string;
    @Prop() author: string;
    @Prop() body: string;
    // can use @Property instead of creating comments schema.
    // @ArrayOf(BlogComments, { default: [] }) comments: BlogComments[];  
    @Property([{body: String, date: Date}], { default: [] }) comments: BlogComments[];  

    @Prop({ default: Date.now }) date: Date;
    @Prop() hidden: boolean;

    @Property({votes: Number, favs:  Number}) 
        meta: {
            votes: number,
            favs:  number
        }

    @Method() recentComments(amount: number = 5) {
        return this.comments
            .sort((a, b) => ((a.date.getMilliseconds() - b.date.getMilliseconds()) > 0 ? 1 : -1) )
            .slice(0, amount);
    }

    onConstructDefinitions(def, func) {

        console.log(JSON.stringify(def, (k, v) => (typeof v == 'function'? `@func:${v.name}` : v), 2));
/*
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
*/
  }
}

// export const BlogModel = toModel<Blog, typeof Blog>(Blog, 'blogs');

// async function getBlog(id: string): Promise<{ blog: Blog, recentComments: Array<BlogComments> }> {
//     const blogDoc = await BlogModel.findById(id); // blogDoc of Blog type
//     const recentComments = blogDoc.recentComments(); // recentComments of BlogComments[] type 
//     return { blog: blogDoc, recentComments };
// }



describe('Basic definition mapping', function() {
    it('should map all properties as expected', function() {
        const BlogSchema = toSchema<typeof Blog, Blog>(Blog);  
    })
});