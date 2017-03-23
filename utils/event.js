
/**
 *  Such a simple event emitter that's mean to be replaced or rewritten.
 */

let queue = {};
let ready = {};

function on(name, fn) {
    if (!queue[name]) {
        queue[name] = [];
    }
    if (fn) {
        if (ready[name]) {
            fn();
        } else {
            queue[name].push(fn);
        }
    }
}

function emit(name, params) {
    ready[name] = true;
    if (queue[name]) {
        let fn;
        while(fn = queue[name].shift()) {
            fn.apply(null, params || []);
        }
    }
}

function reset(name) {
    delete ready[name];
}

export default { on, emit, reset };
