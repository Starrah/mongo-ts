/**
 * This file is made for compatibility with older version of mongoose.
 * To keep the compatibility, support check (by checking whether a type is defined) and ts-ignore is used.
 */
import {Schema} from "mongoose";

/* For compatibility with mongoose v4, Schema.Types.Map should be accessed from this function,
which will throw Error when there is no support for Map. */
export function Schema_Types_Map() {
    // @ts-ignore
    if (Schema.Types.Map) return Schema.Types.Map
    else throw new Error(`Your current mongoose version does not support schema type Map, you may consider to upgrade mongoose version to >5.1.0.`)
}
