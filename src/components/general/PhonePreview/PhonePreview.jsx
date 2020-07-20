import React from 'react';
import lstyle from './PhonePreview.module.scss';
import { Twemoji } from 'react-emoji-render';
import connectComponent from 'redux/helpers/helpers';

function PhonePreview(props) {

  const campaign = { ...props.campaignSettings }

  const regexMap=[
    {
      regex: /{first_name}/g,
      replace: "Johnny"
    },
    {
      regex: /{shop_name}/g,
      replace: props.state.account.shopName
    },
    {
      regex: /{shop_link}/g,
      replace: props.state.account.shopUrl
    }
]

  function parseTags(text) {
    let txt = text
    for (let x of regexMap) {
      txt = txt.replace(x.regex, x.replace)  
    }
    return txt
  }

  function renderReceived() {

    let msg = campaign.textBody ? <Twemoji text={parseTags(campaign.textBody)} /> : ""

    return msg ? (
      <div className={lstyle.receivedMsg}>
        {msg}
      </div>
    ) : ""

  }

  function renderSent() {

    let msg = getFeedback()

    msg = props.err ? props.err.msg : msg

    return (
      <div className={props.err ? [lstyle.sentMsg, lstyle.error].join(" ") : lstyle.sentMsg}>
        {msg}
      </div>
    )
  }

  function renderImg() {

    let image = campaign.img ? <img src={campaign.img} alt="preview" /> : ""

    return campaign.img ? (
      <div className={lstyle.receivedMsg}>
        {image}
      </div>
    ) : ""

  }

  function getFeedback() {
    if(campaign.title.length === 0) { return "Select a draft to edit, or start a new campaign!"}
    if(!campaign.chosenTarget) { return "Remember to choose a target audience for your campaign!"}
    if(campaign.textBody.length <= 20) { return "Alright, time to craft a great sales pitch!"}
    if(campaign.textBody.length >= 20 && campaign.textBody.length < 40) { return "Keep going, I hope this one does well!"}
    if(campaign.textBody.length >= 190 ) { return "It might be getting a little wordy!"}
    if(!campaign.img) { return "A relevant image will help boost those click throughs!"}
    if(campaign.img) { return "Now that is looking like a great campaign!"}
  }

  return (
    <div className={lstyle.wrap}>

      <div className={lstyle.phone}>

        <div className={lstyle.topAccent} />

        <div className={lstyle.screen}>

          {renderReceived()}

          {renderImg()}

          {renderSent()}

        </div>

        <div className={lstyle.bottomAccent} />

      </div>

    </div>
  )

}

export default connectComponent(PhonePreview);