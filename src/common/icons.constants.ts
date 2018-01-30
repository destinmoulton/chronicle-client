/**
 * Define Icons for the different log types.
 */

export interface ILogIcon {
    icon: string;
    color: string;
}

interface ILogIcons {
    [key: string]: ILogIcon;
}

export const LOG_ICONS: ILogIcons = {
    assert: {
        icon: "notification",
        color: "#cc0000"
    },
    error: {
        icon: "exclamation-circle",
        color: "#cc0000"
    },
    group: {
        icon: "folder",
        color: "#ffc049"
    },
    info: {
        icon: "info-circle",
        color: "#058ed9"
    },
    log: {
        icon: "bars",
        color: "#058ed9"
    },
    table: {
        icon: "table",
        color: "#058ed9"
    },
    time: {
        icon: "clock-circle-o",
        color: "#158700"
    },
    trace: {
        icon: "camera-o",
        color: "#058ed9"
    },
    warn: {
        icon: "warning",
        color: "#ff8202"
    }
};
