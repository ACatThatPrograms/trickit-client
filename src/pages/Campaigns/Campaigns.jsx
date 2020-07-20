import React from 'react';
import PhonePreview from 'components/general/PhonePreview/PhonePreview';
import {useHistory} from 'react-router-dom';
import {
  Grid,
  Segment,
  Input,
  Button,
  Dropdown,
  TextArea,
  Header,
  Label,
  Icon,
  Form,
} from 'semantic-ui-react';
import util from 'util/index';
import lstyle from './Campaigns.module.scss';
import connectComponent from 'redux/helpers/helpers';
import EmojiPicker from 'emojione-picker';

function Campaigns(props) {

  const history = useHistory();

  const initSettings = {
    selTitle: "Select Draft",
    title: "",
    chosenTarget: "",
    textBody: "",
    img: "",
    id: "",
  }

  React.useEffect( () => {
    if (history.location.state) {
      switchCampaign(null, {value: history.location.state.id} )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [campaignSettings, setCampaignSettings] = React.useState({ ...initSettings })
  const updateByKey = (k, v) => setCampaignSettings((state) => ({ ...state, [k]: v }))
  const [err, setErr] = React.useState("")

  const [emojiView, setEmojiView] = React.useState(false);
  const [urlView, setUrlView] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState("");

  function switchCampaign(selProps) {
    let campaign = util.data.getDataObjectByIdAndKey(selProps.value, "campaigns")
    let update = {
      selTitle: campaign.name,
      title: campaign.name,
      chosenTarget: util.data.getDataObjectByIdAndKey(campaign.segment_id, "segments"),
      textBody: campaign.text,
      img: campaign.media,
      id: campaign.id,
    }
    setErr("")
    setCampaignSettings((state) => ({ ...state, ...update }))
  }

  function updateTitle(e) {
    let update;
    if (e.target.value.length === 0) {
      update = {
        selTitle: "Select Draft",
        title: ""
      }
    } else {
      update = {
        selTitle: e.target.value,
        title: e.target.value
      }
    }
    if (e.target.value.length >= 34) { return }
    setErr("")
    setCampaignSettings((state) => ({ ...state, ...update }))
  }

  function switchTarget(selProps) {
    let selectedSegment = util.data.getDataObjectByIdAndKey(selProps.value, "segments")
    setErr("")
    updateByKey("chosenTarget", selectedSegment)
  }

  async function onFileChange(event) {
    let b64image = await util.data.handleFile(event);
    let imgStr = "data:image/jpg;base64," + b64image
    updateByKey("img", imgStr)
  }

  function toggleUrlView() {
    setUrlView(!urlView);
  }

  function toggleEmojiWindow() {
    setEmojiView(!emojiView)
  }

  function setUrlImg() {
    updateByKey("img", imgUrl)
    setUrlView(false);
  }

  function removeMedia() {
    updateByKey("img", "");
  }

  function addEmoji(emoji) {
    addText(emoji.shortname)
  }

  function addText(txt) {
    let newTxt = campaignSettings.textBody += txt
    updateByKey("textBody", newTxt)
  }

  async function overwrite() {
    let error = util.data.areCampaignErrors(campaignSettings)
    if (error) {
      return setErr(error)
    }
    let res = await util.data.updateCampaign(campaignSettings)
    if (res.error) {
      console.error(res.error)
    }
  }

  async function saveAsNew() {
    let error = util.data.areCampaignErrors(campaignSettings)
    if (error) {
      return setErr(error)
    }
    let res = await util.data.addNewCampaign(campaignSettings)
    if (res.error) {
      console.error(res.error)
    }  
    switchCampaign({value: res.campaign.id})
  }

  function renderMediaAdd() {
    if (campaignSettings.img) {
      return (
        <Label onClick={removeMedia}>
          <Icon name="minus" /> Remove Media
        </Label>
      )
    }
    else {
      return (<>
        <div className={lstyle.fancyButton}>
          <label htmlFor="file" className={"ui label"}>
            <Icon name='plus' /> Upload Media
           </label>
          <input id="file" type='file' onChange={onFileChange} />
        </div>

        <Label onClick={toggleUrlView}>
          <Icon name={urlView ? "minus" : "plus"} /> Use Url Media
        </Label>
      </>)
    }
  }

  return (

    <Grid columns={2} stackable className={lstyle.wrap}>

      <Grid.Column className={lstyle.campaignCol}>

        <Header as="h2" textAlign="center">
          Campaign Manager
        </Header>

        <Segment className={lstyle.buttonSegment}>

          <Button
            content="Send"
            color="green"
            disabled={true}
          />

        </Segment>

        <Segment className={lstyle.campaignSegment}>

          <Dropdown
            button
            className='icon'
            floating
            labeled
            icon='calendar outline'
            options={util.component.buildCampaignDropdownOptions("campaigns")}
            search
            text={campaignSettings.selTitle}
            onChange={(e, props) => switchCampaign(props)}
            value={campaignSettings.id}
          />

          <Button
            content="Save New"
            color="teal"
            loading={props.state.loaders.account}
            onClick={saveAsNew}
          />

          <Button
            content="Update"
            color="orange"
            loading={props.state.loaders.account}
            onClick={overwrite}
          />

        </Segment>


        <div className={lstyle.titleSegment}>

          <Input
            label="Title"
            placeholder="My awesome campaign"
            value={campaignSettings.title}
            onChange={(e) => updateTitle(e)}
            fluid
            className={lstyle.titleInput}
          />

        </div>

        <div className={lstyle.targetSegment}>
          <Dropdown
            placeholder='Target Audience'
            selection
            options={util.component.buildCampaignDropdownOptions("segments")}
            onChange={(e, props) => switchTarget(props)}
            fluid
            value={campaignSettings.chosenTarget.id}
          />
        </div>

        <Form>
          <TextArea
            value={campaignSettings.textBody}
            placeholder={"Write your message right here!"}
            onChange={(e) => updateByKey("textBody", e.target.value)}
          />
        </Form>

        <div className={lstyle.buttonRow}>

          <div className={emojiView ? lstyle.emojiPicker : [lstyle.emojiPicker, lstyle.closed].join(" ")}>

            <EmojiPicker onChange={addEmoji} />

          </div>

          {renderMediaAdd()}

          <Label onClick={toggleEmojiWindow}>
            <Icon name={emojiView ? "minus" : "smile outline"} /> Emojis
          </Label>

          <div className={urlView ? lstyle.urlview : [lstyle.urlview, lstyle.closed].join(" ")}>
            <Input
              placeholder="Image URL"
              action={{
                color: 'teal',
                labelPosition: 'left',
                icon: 'image',
                content: 'Add Img',
                onClick: setUrlImg,
              }}
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>

        </div>

        <Header as="h5">
          Tags
        </Header>

        <Segment>

          <Button
            content={"{first_name}"}
            onClick={() => addText("{first_name}")}
          />

          <Button
            content={"{shop_name}"}
            onClick={() => addText("{shop_name}")}
          />

          <Button
            content={"{shop_url}"}
            onClick={() => addText("{shop_link}")}
          />

        </Segment>


      </Grid.Column>

      <Grid.Column>

        <Header as="h2" textAlign="center">
          Live Preview
        </Header>


        <PhonePreview campaignSettings={campaignSettings} err={err}/>
      </Grid.Column>

    </Grid>

  )

}

export default connectComponent(Campaigns)
export const campaigns = Campaigns