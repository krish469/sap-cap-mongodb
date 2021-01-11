sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	var myDetailCont;
	return Controller.extend("com.application1.controller.DetailView", {
		onInit: function () {
			myDetailCont = this;
			this.getOwnerComponent().getRouter().getRoute("detailpage").attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var orderNo = oEvent.getParameters().arguments.orderNo;
			var ItemNo = oEvent.getParameters().arguments.ItemNo;
			
			if (orderNo) {
				var oModel = sap.ui.getCore().getModel("MyOrders");
				if (oModel) {
					var oData = oModel.oData.DLSet.filter( d => d.orderNo === orderNo && d.ItemNo === ItemNo );
					var myData = {};
					myData.Material = oData[0].Material;
					myData.Quantity = oData[0].Quantity;
					myData.QUOM     = oData[0].QUOM;
					myData.Price    = oData[0].Price;
					myData.Currency = oData[0].Currency;
				
					var oOrdDetailsModel = new JSONModel();
					myDetailCont.getView().setModel( oOrdDetailsModel, "OrderDetails");
					 oOrdDetailsModel.setData(myData);


                  //Load Material Image
					//Show busy indicator
					//sap.ui.core.BusyIndicator.show(0);
					var uri = "/localmongodb/v2/odata/mongodb/MyMaterials/Materials('" + myData.Material + "')";
					var MyMaterialModel = new JSONModel();
					$.get(uri, function (data, status) {
							var oData1 = {};
							oData1.ImageData = data.d.ImageData;
							oData1.ImageContentType = data.d.ImageContentType;
							myDetailCont.getView().setModel(MyMaterialModel, "MyMaterial");
							MyMaterialModel.setData(oData1);
						}) //Get Image Call
						.fail(function () {
							var oData1 = {};
							var MyImageModel = new JSONModel();
							myDetailCont.getView().setModel(MyMaterialModel, "MyMaterial");
							MyMaterialModel.setData(oData1);
						})
						.always(function () {
							//Close busy indicator
							//sap.ui.core.BusyIndicator.hide();
						});

				} //oModel
			} //orderNo
		}

	});
});