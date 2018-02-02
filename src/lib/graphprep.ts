import { Moment } from "moment";
import { GRAPH_DATE_FORMAT } from "../common/date.constants";

/**
 * Generate an array/series of dates including the
 * start and end (inclusive).
 *
 * @param startDate Moment
 * @param endDate Moment
 */
export const generateDateSeries = (
    startDate: Moment,
    endDate: Moment
): string[] => {
    const datePointer = startDate.clone();
    const dates = [];
    while (!datePointer.isAfter(endDate, "day")) {
        dates.push(datePointer.format(GRAPH_DATE_FORMAT));
        datePointer.add(1, "d");
    }
    return dates;
};
