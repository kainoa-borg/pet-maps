import {expect} from 'chai';
import { debugMsg, errorMsg, logMsg, successMsg } from './loggingTypes.mjs';

(function() {
    var _log = console.log;
    var _error = console.error;
    var _debug = console.debug;

    console.log = function(message, level){
        _log.apply(console, [logMsg(message, level)]);
    }
    console.error = function(message, level=0){
        _log.apply(console, [errorMsg(message, level)]);
    }
    console.debug = function(message, level=0){
        if (process.env.MODE == "DEBUG")
            _log.apply(console, [debugMsg(message, level)]);
    }
    console.success = function(message, level=0){
        _log.apply(console, [successMsg(message, level)])
    }
})();

export const debugConsole = () => {
    if (process.env.MODE == "PROD" || process.env.MODE == "TEST") {
        console.log = () => {};
    }
}