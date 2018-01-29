import { Moment } from "moment";

/**
 * The time at exactly midnight.
 *
 * @param startMoment Moment
 */
export const getDateBeginPoint = (startMoment: Moment) => {
    return startMoment
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);
};

/**
 * The time 1ms before midnight.
 *
 * @param endMoment Moment
 */
export const getDateEndPoint = (endMoment: Moment) => {
    return endMoment
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999);
};
