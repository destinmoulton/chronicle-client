/**
 * Define details for the different log types.
 */

export interface ILogType {
    icon: string;
    color: string;
    name: string;
}

interface ILogTypes {
    [key: string]: ILogType;
}

export const LOG_TYPE_EMPTY: ILogType = {
    icon: "solution",
    color: "#9b71b7",
    name: "custom"
};

export const LOG_TYPES: ILogTypes = {
    action: {
        icon: "share-alt",
        color: "black",
        name: "action()"
    },
    assert: {
        icon: "notification",
        color: "#cc0000",
        name: "assert()"
    },
    error: {
        icon: "exclamation-circle",
        color: "#cc0000",
        name: "error()"
    },
    group: {
        icon: "folder",
        color: "#ffc049",
        name: "group()"
    },
    info: {
        icon: "info-circle",
        color: "#058ed9",
        name: "info()"
    },
    log: {
        icon: "bars",
        color: "#058ed9",
        name: "log()"
    },
    table: {
        icon: "table",
        color: "#058ed9",
        name: "table()"
    },
    time: {
        icon: "clock-circle-o",
        color: "#158700",
        name: "time()"
    },
    trace: {
        icon: "camera-o",
        color: "#058ed9",
        name: "trace()"
    },
    warn: {
        icon: "warning",
        color: "#ff8202",
        name: "warn()"
    }
};
