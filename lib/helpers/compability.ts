/**
 * This file is made for compatibility with older version of mongoose.
 * To keep the compatibility, support check (by checking whether a type is defined) and ts-ignore is used.
 */
import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {Equals, Not} from "tsafe";
import {SubType} from "../models/utils";

/* For compatibility with mongoose v4, Schema.Types.Map should be accessed from this function,
which will throw Error when there is no support for Map. */
export function Schema_Types_Map() {
    // @ts-ignore
    if (Schema.Types.Map) return Schema.Types.Map
    else throw new Error(`Your current mongoose version does not support schema type Map, you may consider to upgrade mongoose version to >5.1.0.`)
}

// @ts-ignore
type IsHydratedDocumentSupported = Not<Equals<mongoose.HydratedDocument<{}>, any>>
// @ts-ignore
type DocFromClass<T, TOverrides, TVirtuals> = IsHydratedDocumentSupported extends true ? mongoose.HydratedDocument<T, SubType<T, Function> & TOverrides, TVirtuals> : mongoose.EnforceDocument<T, TOverrides>
export type Doc<T, TOverrides = {}, TVirtuals = {}> = T extends mongoose.Model<any> ? InstanceType<T> : DocFromClass<T, TOverrides, TVirtuals>

// @ts-ignore
type IsUnpackedIntersectionSupported = Not<Equals<mongoose.UnpackedIntersection<{}, {}>, any>>
type UnpackedIntersectionPolyfill<T, U> = T extends null ? null : T extends (infer A)[]
    ? (Omit<A, keyof U> & U)[]
    : keyof U extends never
        ? T
        : Omit<T, keyof U> & U;
// @ts-ignore
export type Populated<T, TypeForRefFields> = IsUnpackedIntersectionSupported extends true ? mongoose.UnpackedIntersection<T, TypeForRefFields> : UnpackedIntersectionPolyfill<T, TypeForRefFields>

// @ts-ignore For compatibility, because the count of generic types in different versions of
export type Model<T, TQueryHelpers, TMethodsAndOverrides, TVirtuals> = mongoose.Model<T, TQueryHelpers, TMethodsAndOverrides, TVirtuals>
