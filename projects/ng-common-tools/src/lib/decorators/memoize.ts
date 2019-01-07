export function memoize(props, name, descriptor) {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
        throw Error(`@memoize decorator can only be applied to methods got: ${typeof fn}`);
    }

    return {
        configurable: true,
        value: function value() {
            const propMapName: string = '___memoize_store___';
            if (!this.hasOwnProperty(propMapName)) {
                Object.defineProperty(this, propMapName, {
                    configurable: false,
                    enumerable: false,
                    value: {}
                });
            }
            const storage = this[propMapName];
            if (!storage.hasOwnProperty(name)) storage[name] = {};
            const key = JSON.stringify(arguments);
            return storage[name].hasOwnProperty(key) ? storage[name][key] : storage[name][key] = fn.apply(this, arguments);
        }
    };
}

