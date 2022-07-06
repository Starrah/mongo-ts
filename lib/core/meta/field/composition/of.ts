import {MetaAgent} from "../../../../helpers";
import {handleProvidedType} from "../../../infer-type";


export function Of(type: any) {
    return (targetPrototype: object, propertyName: string) => {
        MetaAgent.define("ofType", handleProvidedType(type), targetPrototype, propertyName)
    }
}
