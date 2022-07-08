import {setDefinitionMap as definitionMapSetter} from './field-definition-map';

export namespace MongoTS {
    export const setDefinitionMap = definitionMapSetter;
}

export * from './core';
export * from './models/external';
