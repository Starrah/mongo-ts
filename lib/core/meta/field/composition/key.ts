import {createPropertyDecorator} from '../create-property-decorator';

// equivalent to @Required()@Unique()
export function Key() {
    return createPropertyDecorator('Key', () => {
        return {
            definition: {unique: true, required: true}
        }
    })
}
