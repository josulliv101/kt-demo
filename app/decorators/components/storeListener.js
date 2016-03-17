import React from 'react';

// Create a React higher order component
export default (Store, ...ids) => { // id1, id2, id3

	const getStoreState = (stateIds) => {

		// Return all store state if no properties speficied
		if (stateIds.length === 0) return Store().state;

		// Return only specified state properties
		return stateIds.reduce(_reduceStore.bind(null, Store()), {});
	};

	return (TargetComponent) => {

	  return class StoreListener extends React.Component {

		  constructor(props = {}) {
		    super(props);
		    this.state = getStoreState(ids);
		    this.onChange = ::this.onChange;
		  }
			
		  onChange() {
		    this.setState(getStoreState(ids));
		  }

		  componentDidMount() {
		    Store().addChangeListener(this.onChange);
		  }

		  componentWillUnmount() {
		    Store().removeChangeListener(this.onChange);
		  }

		  render() {
	    	return <TargetComponent {...this.props} {...this.state} />;
	    }
	  };
	}
}

function _reduceStore(store, result, id) {

	result[id] = store.state[id];

	return result;
}
