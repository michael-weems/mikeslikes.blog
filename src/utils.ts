export function isDefined<T>(arg: null | undefined | T): arg is T {
    if (arg == null) return false;
    if (arg == undefined) return false;
    return true;
}
export function isNotDefined<T>(arg: null | undefined | T): arg is (null | undefined) {
    return !isDefined(arg);
}