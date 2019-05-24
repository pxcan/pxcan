const UNSET_VALUE = {};

export function memoize(fn) {
    let val = UNSET_VALUE;
    let map = null;

    return function(...args) {
        if (args.length === 0) {
            if (val === UNSET_VALUE) val = fn();
            return val;
        }

        map = map || new Map();

        const key = args[0];

        if (map.has(key)) {
            const m = map.get(key);
            return m(...args.slice(1));
        } else {
            // console.log(`CACHE MISS ${fn.name} args[${args.length}] ${key}`)
            const m = memoize(fn.bind(null, args[0]));
            map.set(key, m);
            return m(...args.slice(1));
        }
    }
}
