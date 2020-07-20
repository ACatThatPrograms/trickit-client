import store from 'redux/store/store';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import { thunks } from 'redux/actions/actions'

export function buildError(err) {
  return {
    error: err
  }
}

export function getDataObjectByIdAndKey(id, key) {
  let state = store.getState()
  let options = state.account.data[key];

  for (let s of options) {
    if (s.id === id) { return s}
  }

  return ""

}

//* Returns file as compressed base64 image */
export async function handleFile(event) {
  return new Promise(async (resolve, reject) => {
    let file = event.target.files[0];
    let reader = new FileReader();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 400,
      useWebWorker: true
    }

    try {
      const compressedFile = await imageCompression(file, options);
      reader.readAsBinaryString(compressedFile);
      reader.onload = () => { resolve(btoa(reader.result)) };
    }
    catch (ex) {
      console.error(ex)
    }

  });
}

export async function addNewCampaign(details) {
  return new Promise( async (resolve) => {
    let currentCampaigns = store.getState().account.data.campaigns
    let campaign = _constructNewCampaign(details)
    currentCampaigns.push(campaign)
    let res = await store.dispatch(thunks.account.update({type: "campaigns", data: currentCampaigns}))
    resolve({res: res, error: res.error, campaign: campaign})
  })
}

export function updateCampaign(details) {
  return new Promise( async (resolve) => {
    let currentCampaigns = store.getState().account.data.campaigns
    let campaign = _constructNewCampaign(details, true)
    let replaceId = currentCampaigns.map( (x) => {
      return x.id
    }).indexOf(details.id)
    currentCampaigns[replaceId] = campaign 
    let res = await store.dispatch(thunks.account.update({type: "campaigns", data: currentCampaigns}))
    resolve(res)
  })
}

export function areCampaignErrors(details) {
  if (details.title.length === 0) return {type: "title", msg: "Make sure you set a title!"}
  if (!details.chosenTarget) return {type: "chosenTarget", msg: "Don't forget to choose a target group!"}
  if (details.textBody.length === 0 ) return {type: "textBody", msg: "Make sure you actually write a campaign!"}
  return false;
}


function _constructNewCampaign(details, sameId) {
  return {
    name: details.title,
    id: sameId ? details.id : uuidv4(),
    media: details.img,
    segment_id: details.chosenTarget.id,
    stats: {
      sent: 0,
      clicked: 0,
    },
    status: "Preview",
    text: details.textBody
  }
}