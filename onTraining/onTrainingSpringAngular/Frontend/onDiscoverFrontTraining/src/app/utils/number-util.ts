export class NumberUtil {
    /** It validates if is a number */
    static isNumber(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
