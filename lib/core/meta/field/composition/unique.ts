import {createPropertyDecorator} from '../create-property-decorator';

export function Unique(value: boolean = true) {
    return createPropertyDecorator('Unique', () => {
        return {
            definition: {unique: value}
        }
    })
}
