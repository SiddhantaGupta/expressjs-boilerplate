/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = <ObjectType extends object = any>(object: ObjectType, keys: (keyof ObjectType)[]) => {
    return keys.reduce((obj: Partial<ObjectType>, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

export default pick;
