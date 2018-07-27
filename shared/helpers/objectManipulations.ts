/**
 * Get a random Property of a Object
 * @param obj: the object to perform
 */
export const randomProperty = (obj) => {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};