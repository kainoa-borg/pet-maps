import chalk from 'chalk';

/**
 * @description 
 */
const calcPadding = (level) => {
    let padding = ''
    for (let i = 0; i < level; ++i) {
        padding += '  ';
    } 
    return padding;
}

/** 
 * @description Returns blue logging message at specified depth
 * @param {String } message: message to be displayed
 * @param {String } level: the depth of this message; how much padding to apply (default 0)
 * @returns {String}
    */
export const logMsg = (message, level=0) => {
    return calcPadding(level) + chalk.blueBright("<Log>: ") + message;
}

/** 
 * @description Returns yellow debug message at specified depth
 * @param {String } message: message to be displayed
 * @param {String } level: the depth of this message; how much padding to apply (default 0)
 * @returns {String}
    */
export const debugMsg = (message, level=0) => {
    return calcPadding(level) + chalk.yellowBright("<Debug>: ") + message;
}

/** 
 * @description Returns green success message at specified depth
 * @param {String } message: message to be displayed
 * @param {String } level: the depth of this message; how much padding to apply (default 0)
 * @returns {String}
    */
export const successMsg = (message, level=0) => {
    return calcPadding(level) + chalk.greenBright("<Success>: ") + message;
}

/** 
 * @description Returns red error message at specified depth
 * @param {String} message: message to be displayed
 * @param {String} level: the depth of this message; how much padding to apply (default 0)
 * @returns {String}
    */
export const errorMsg = (message, level=0) => {
    return calcPadding(level) + chalk.redBright("<Error!!!>: ") + message;
}