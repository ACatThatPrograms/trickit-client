import store from 'redux/store/store';

/** Return key,value state updater 
 * @param {React.useState setState} stateBuilder - State Setter from React.useState()
*/
export function buildKeyValueStateUpdater(setState) {
  return (k,v) => setState( (state) => ({...state, [k]: v}))
}

/** Return key,value state updater that defaults non updates states to initial values
 * @param {React.useState setState} stateBuilder - State Setter from React.useState()
 * @param {obj} initState - Init state to default to
 */
export function buildDefaultingKeyValueStateUpdater(setState, initState) {
  return (k,v) => setState( (state) => ({...initState, [k]: v}))
}

/** Build campaign dropdown selections for <Dropdown/> Menu */
export function buildCampaignDropdownOptions(key) {

  let state = store.getState();
  let available = state.account.data[key];
  
  if (!available || available.length === 0) { return []}

  let options = []

  for (let a of available) {
    options.push({
      key: a.id,
      text: a.name,
      value: a.id,
    })
  }

  return options

}