import * as moment from 'moment';

export class DateUtil {

    /** It returns a object type Date from a string */
    static getDate(stringValue : string) : Date{
        // date format YYYY-MM-DD
        var momentObj = moment(stringValue,'YYYY-MM-DD');
        if(momentObj && momentObj.isValid()){
            return momentObj.toDate();
        }
        return null;
    }

}
