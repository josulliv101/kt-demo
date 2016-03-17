const SYMBOL_PREFIX = '@@com.kindturtle';


//// Utils ////

export const REGISTRY = {
  STORE: 'Store',
  DISPATCHER: 'Dispatcher',
};

export const SYMBOL = { // For global symbols
  STORE: `${SYMBOL_PREFIX}.store`
};

export const CHANGE = 'state_change';


//// Cursors into Store State Structure ////

export const CURSOR = {
  FETCHING: ['fetching'],
  NOTIFICATIONS: ['notifications'],
  AUTH: ['auth'],
  FOOBAR: ['foo', 'bar'], // example of deeply nested cursor

  // Helper to convert cursor to string
  cursor: (cursor, resolver =  arr => arr.join(',') ) => resolver(cursor)
};


//// Actions Types ////
export const ACTION = {
  TYPE: {
    ADD: 'add',
    SET: 'set',
    CLEAR: 'clear',
    MERGE: 'merge'
  }
};


//// Actions ////

export const FETCH2 = {
  STATUS: {
    id: 'fetch_status',
    type: ACTION.TYPE.SET,
    cursor: CURSOR.FETCHING
  }
};

export const FETCH = {
  STATUS: `${ACTION.TYPE.MERGE}:fetch_status`
};

export const NOTIFY2 = {
  SHOW: {
    id: 'notify_show',
    type: `${ACTION.TYPE.ADD}`,
    cursor: CURSOR.NOTIFICATIONS
  },
  CLEAR: {
    id: 'notify_clear',
    type: `${ACTION.TYPE.CLEAR}`,
    cursor: CURSOR.NOTIFICATIONS
  }
};

export const NOTIFY = {
  SHOW: `${ACTION.TYPE.ADD}:notify_show`,
  CLEAR: `${ACTION.TYPE.CLEAR}:notify_clear`
};
