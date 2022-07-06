import {createPropertyDecorator} from '../create-property-decorator';

export function Default(value: any) {
    return createPropertyDecorator('Default', () => {
        return {
            definition: {default: value}
        }
    })
}
