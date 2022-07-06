import {createPropertyDecorator} from '../create-property-decorator';

export function Match(value: RegExp | string) {
    return createPropertyDecorator('Match', () => {
        return {
            definition: {match: value}
        }
    })
}
