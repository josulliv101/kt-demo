import {FETCH, NOTIFY} from '../actions/const';

export default ($$store) => {

	return (targetClass) => {
		
		targetClass.prototype.handleAction = function ({update, actionType}) { // Can't use arrow-function 'this' behavior here
			
			const storeModifiers = {
				merge: update => this[$$store] = this.structure.mergeDeepIn(actionType.cursor, update),
				set:   update => this[$$store] = this.structure.setIn(actionType.cursor, update),
				add:   item   => this[$$store] = this.structure.updateIn(actionType.cursor, list => list.push(item)),
				clear: () 	  => this[$$store] = this.structure.updateIn(actionType.cursor, list => list.clear())
			}

			if (!storeModifiers[actionType.type]) throw new Error("Not a valid store modifier");

			storeModifiers[actionType.type](update);
		}
	}
}