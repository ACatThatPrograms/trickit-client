// used to collect all utility functions for export
import * as validation from './validation';
import * as data from './data';
import * as component from './component';

export default {
  component: {
    buildKeyValueStateUpdater: component.buildKeyValueStateUpdater,
    buildDefaultingKeyValueStateUpdater: component.buildDefaultingKeyValueStateUpdater,
    buildCampaignDropdownOptions: component.buildCampaignDropdownOptions,
  },
  data: {
    buildError: data.buildError,
    getDataObjectByIdAndKey: data.getDataObjectByIdAndKey,
    handleFile: data.handleFile,
    addNewCampaign: data.addNewCampaign,
    updateCampaign: data.updateCampaign,
    areCampaignErrors: data.areCampaignErrors,
  },
  validation: {
    verifyLoginForm: validation.verifyLoginForm,
    verifyRegistrationForm: validation.verifyRegistrationForm,
  }
}