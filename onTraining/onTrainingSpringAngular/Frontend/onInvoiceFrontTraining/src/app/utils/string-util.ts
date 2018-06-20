export class StringUtil {
    /** This method returns string time */
    static getStringTime(date : Date){
        if(!date)
            date = new Date();
        return date.getTime().toString();
    }
}
