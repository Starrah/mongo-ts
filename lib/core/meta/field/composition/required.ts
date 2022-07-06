import {createPropertyDecorator} from '../create-property-decorator';

export function Required(value: boolean | (<T>(this: T) => boolean) = true) {
    return createPropertyDecorator('Required', () => {
        return {
            definition: {required: value}
        }
    })
}
