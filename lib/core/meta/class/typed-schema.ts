import {MetaAgent} from "../../../helpers";
import {warnInDecorator} from "../../../models/utils";
import {SchemaOptions} from "mongoose";

export function TypedSchema(options: SchemaOptions = {}) {
    return <T extends Object>(targetPrototype: T) => {
        if (!MetaAgent.has("schemaOptions", targetPrototype)) {
            MetaAgent.define("schemaOptions", options, targetPrototype)
        } else warnInDecorator(`class ${targetPrototype.constructor.name} already processed by @TypedSchema!`)
        return targetPrototype;
    }
}