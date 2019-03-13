import {finalize} from 'rxjs/operators';

export function memoizeStream(props, name, descriptor) {
    const fn = descriptor.value;

    if (typeof fn !== 'function')
        throw Error(`@memoizeStream decorator can only be applied to methods got: ${typeof fn}`);

    return {
        configurable: true,
        value: function value() {
            const propMapName = '___memoize_stream_store___';

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
            if (storage[name].hasOwnProperty(key)) return storage[name][key];
            const obs = fn.apply(this, arguments);
            return storage[name][key] = obs.pipe(
                finalize(() => {
                    delete storage[name][key];
                })
            );
        }
    };
}
