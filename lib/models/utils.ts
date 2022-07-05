export type SubType<Base, Condition> =
    Pick<Base, { [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]>;

export type Ctor<T = any> = new(...args: any[]) => T;
