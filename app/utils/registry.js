import { REGISTRY } from '../actions/const';

const _cache = {};

// Stash items in registry for easy access
export default {

  set(name, value) {
    _cache[name] = value;
  },

  get(name) {
    return () => _cache[name];
  },

  clear() {
    // Avoid _cache reassignment to new, empty {}
    Object.keys(_cache).forEach(key => delete _cache[key]);
  },

  size() {
    return Object.keys(_cache).length;
  },

};

// Shortcuts for getting common instances
export const Store = () => _cache[REGISTRY.STORE];
export const Dispatcher = () => _cache[REGISTRY.DISPATCHER];
