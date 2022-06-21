import {DefinitionMap} from './models/definition-map.model'

let definitionMap: Partial<DefinitionMap>;

export function getDefinitionMap(): Readonly<Partial<DefinitionMap>> {
    return Object.freeze(definitionMap);
}

export function setDefinitionMap(defMap: Partial<DefinitionMap>) {
    if (definitionMap) {
        console.warn('calling setDefinitionMap second time will override the existing definition-map.')
    }
    definitionMap = defMap;
}

export function getDefaultDefinition(fieldName: string, type: Function, decorator: string): Partial<DefinitionMap> {
    let definition: Partial<DefinitionMap> = {};
    if (definitionMap) {
        if (definitionMap.byDecorator && definitionMap.byDecorator[decorator]) {
            const def = definitionMap.byDecorator[decorator] || {};
            definition = {...definition, ...def};
        }

        if (definitionMap.byDecorator && definitionMap.byType[type.name]) {
            const def = definitionMap.byType[type.name] || {};
            definition = {...definition, ...def};
        }

        if (definitionMap.byDecorator && definitionMap.byField[fieldName]) {
            const def = definitionMap.byField[fieldName] || {};
            definition = {...definition, ...def};
        }
    }
    return definition;
}
