import {TypedSchemaConfig} from '../../../models/internal';
import {MetaAgent} from "../../../helpers";
import {warnInDecorator} from "../../../models/utils";

export function TypedSchema(config: TypedSchemaConfig = {}) {
    return <T extends Object>(targetPrototype: T) => {
        if (!MetaAgent.has("schemaOptions", targetPrototype)) {
            MetaAgent.define("schemaOptions", config, targetPrototype)
        } else warnInDecorator(`class ${targetPrototype.constructor.name} already processed by @TypedSchema!`)
        return targetPrototype;
    }
}