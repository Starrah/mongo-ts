import {MetaAgent} from "../../../helpers";

export function Verbose(verbose: boolean = true) {
    return <T extends Object>(targetPrototype: T) => {
        MetaAgent.define("verbose", verbose, targetPrototype)
        return targetPrototype;
    }
}
