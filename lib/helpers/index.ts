export class MetaAgent {
    private static metaKey(key: string): string {
        return "mongo-ts-struct:" + key
    }

    static define(metadataKey: string, metadataValue: any, target: object, propertyKey?: string | symbol): void {
        metadataKey = MetaAgent.metaKey(metadataKey)
        return Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)
    }

    static merge(metadataKey: string, metadataValue: any, target: object, propertyKey?: string | symbol): void {
        metadataKey = MetaAgent.metaKey(metadataKey)
        const originValue = Reflect.getMetadata(metadataKey, target, propertyKey)
        if (originValue !== undefined && typeof originValue !== "object")
            throw new Error(`cannot merge metadata: Reflect.getMetadata(${metadataKey}, ${target}, ${String(propertyKey)}) returned ${originValue}, which should be object or undefined.`)
        metadataValue = {...originValue, ...metadataValue}
        return Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey)
    }

    static get(metadataKey: string, target: object, propertyKey?: string | symbol): any {
        metadataKey = MetaAgent.metaKey(metadataKey)
        return Reflect.getMetadata(metadataKey, target, propertyKey)
    }

    static has(metadataKey: string, target: object, propertyKey?: string | symbol): boolean {
        return !!MetaAgent.get(metadataKey, target, propertyKey)
    }
}
