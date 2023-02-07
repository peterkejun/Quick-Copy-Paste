export const isNull = (v: any) => v === null;

export const isUndefined = (v: any) => v === undefined;

export const isNullish = (v: any) => isNull(v) || isUndefined(v);
