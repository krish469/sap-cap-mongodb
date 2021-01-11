function initModel() {
	var sUrl = "/localmongodb/v2/odata/mongodb/MyOrders/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}