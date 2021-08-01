const repeat = require('repeat-string');

module.exports.asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports.padLeft = async (str, num, ch) => {
    str = str.toString();

    if (typeof num === 'undefined') {
        return str;
    }

    if (ch === 0) {
        ch = '0';
    } else if (ch) {
        ch = ch.toString();
    } else {
        ch = ' ';
    }

    return repeat(ch, num - str.length) + str;
};

module.exports.cleanWhiteSpace = async (content) => {
    return content.replace(/\s{2,}/g, ' ');
}

module.exports.replaceString = async (content) => {
    return content.replace(/#/gi, '');
}