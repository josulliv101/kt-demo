var _cache = {};

// Stash actions, stores, and apis in the registry.
export default {

    set(name, value) {
        _cache[name] = value;
    },

    get(name) {
        return () => _cache[name]
    },

    clear() {
        _cache = {};
    }

};