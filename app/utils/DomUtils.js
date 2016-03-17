import flow from 'lodash/flow';

export default {
  // Get & parse JSON string embedded in <script> tag
  getData: flow(
		id => document.getElementById(id).textContent,
		str => JSON.parse(str)
  ),
};
