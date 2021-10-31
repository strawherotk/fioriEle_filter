sap.ui.define([
    "sap/ui/model/Filter", 
    "sap/ui/comp/smartfilterbar/SmartFilterBar", 
    "sap/m/ComboBox",
    "sap/m/CheckBox",
], function (Filter, SmartFilterBar, ComboBox, CheckBox) {
    "use strict";
    return {
        getCustomAppStateDataExtension: function (oCustomData) {
            //the content of the custom field will be stored in the app state, so that it can be restored later, for example after a back navigation.
            //The developer has to ensure that the content of the field is stored in the object that is passed to this method.
            if (oCustomData) {
                var oCustomField1 = this.oView.byId("displayCMIR");
                if (oCustomField1) {
                    oCustomData.displayCMIR = oCustomField1.getSelected();
                }
            }
        },
        restoreCustomAppStateDataExtension: function (oCustomData) {
            //in order to restore the content of the custom field in the filter bar, for example after a back navigation,
            //an object with the content is handed over to this method. Now the developer has to ensure that the content of the custom filter is set to the control
            if (oCustomData) {
                if (oCustomData.displayCMIR !== undefined) {    // the displayCMIR can be 'false'; so it's required to compare with 'undefined'
                    var oChkBoxDisplayCMIR = this.oView.byId("displayCMIR");
                    oChkBoxDisplayCMIR.setSelected(oCustomData.displayCMIR);
                }
            }
        },
        onBeforeRebindTableExtension: function(oEvent) {
            var oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};

            var oSmartTable = oEvent.getSource();
            var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            if (oSmartFilterBar instanceof SmartFilterBar) {
                var oCustomControl = oSmartFilterBar.getControlByKey("displayCMIR");
                if (oCustomControl instanceof sap.m.CheckBox) {
                    var bDisplayCMIRFields = oCustomControl.getSelected();
                    if (bDisplayCMIRFields) {
                        // Display CMIR Fields
                        // Or display CMIR filters

                    }
                }
            }
        },
        onSelectChkBoxCMIR: function(oEvent) {
            var oSmartTable = this.byId("com.hirose.sd.price.pricecondreport::sap.suite.ui.generic.template.ListReport.view.ListReport::PriceMasterSet--listReport");
            var oUiState = oSmartTable.getUiState();
            var oPresentVar = oUiState.getPresentationVariant();
            // Add addtional CMIR fields to the table - Example
            oPresentVar.Visualizations && oPresentVar.Visualizations[0].Content.push({Value: 'CCustomerMaterialDesc', Label: undefined})
            oSmartTable.setUiState(oUiState);
        }
    };
});