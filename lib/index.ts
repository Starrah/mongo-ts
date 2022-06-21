import {setDefinitionMap as definitionMapSetter} from './field-definition-map';

export namespace MongoTS {
    export const setDefinitionMap = definitionMapSetter;
}

export * from './core';
export {ExtendableMongooseDoc} from './core/extendable-mongoose-doc';
export * from './models/external';