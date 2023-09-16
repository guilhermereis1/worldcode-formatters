"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = exports.date_time = void 0;
var moment = require("moment");
var date_time = function (dateTimeString) {
    var parsedDate = moment(dateTimeString);
    if (!parsedDate.isValid())
        return "Invalid Date Time";
    return parsedDate.format("DD/MM/YYYY HH:mm:ss");
};
exports.date_time = date_time;
var date = function (dateString) {
    var parsedDate = moment(dateString);
    if (!parsedDate.isValid())
        return "Invalid Date";
    return parsedDate.format("DD/MM/YYYY");
};
exports.date = date;
