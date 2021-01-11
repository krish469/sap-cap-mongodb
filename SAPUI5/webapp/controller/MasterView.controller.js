sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, Filter, FilterOperator, JSONModel, MessageBox) {
	"use strict";
	var that = this;
	return Controller.extend("com.application1.controller.MasterView", {

		onInit: function() {
			that = this;
			var oList = this.byId("idList");
			oList.setSticky(["HeaderToolbar"]);
		},


		onMasterSearch: function(oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter({
					filters: [
						new Filter("orderNo", FilterOperator.Contains, sQuery),
						new Filter("Material", FilterOperator.Contains, sQuery)
					],
					and: false
				});
				aFilters.push(filter);
			}

			// update list binding
			var oList = this.byId("idList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},

		onListItemPress: function(oEvent) {
			var orderNo = oEvent.getParameters().listItem.getTitle();
			var ItemNo = oEvent.getParameters().listItem.getDescription();
			this.getOwnerComponent().getRouter().navTo("detailpage", {
				"orderNo"   : orderNo,
				"ItemNo"  : ItemNo
			});
		},

		onPressButton: function(oEvt) {
			var fromDateTime = that.getView().byId("fromDTP").getDateValue();
			var toDateTime = that.getView().byId("toDTP").getDateValue();

			if (fromDateTime === null || toDateTime === null) {
				MessageBox.error("Enter From Date Time and To Date Time");
			} else if (Number(toDateTime) >= Number(fromDateTime)) {

				var fromDate = that.getDateString(fromDateTime);
				var toDate = that.getDateString(toDateTime);

				var url = "/localmongodb/v2/odata/mongodb/MyOrders/Orders?$filter=(OrderCreatedOn ge '" + fromDate + "' and OrderCreatedOn le '" +
					toDate + "')";

				$.get(url, function(data, status) {

					for (var i in data.d.results) {
						var DateTime = new Date(data.d.results[i].OrderCreatedOn);

						data.d.results[i].DateTime = DateTime.getFullYear() + "-"
							+ DateTime.getMonth() + "-" + DateTime.getDate()
							+ "T" + DateTime.getHours() + ":"
							+ DateTime.getMinutes() + ":" + DateTime.getSeconds();
					}

					var oModel = new JSONModel();
					that.getView().setModel(oModel, "MyOrders");
					sap.ui.getCore().setModel(oModel, "MyOrders");
					oModel.setData({
						DLSet: data.d.results
					});
				});


			} else {
				MessageBox.error("Enter To Date Time greater than From Date Time");
			}
		},

		getDateString: function(date) {
			var Month = String(date.getMonth() + 1);
			if (Month.length !== 2) {
				Month = "0" + Month;
			}

			var Day = String(date.getDate());
			if (Day.length !== 2) {
				Day = "0" + Day;
			}

			var Hours = String(date.getHours());
			if (Hours.length !== 2) {
				Hours = "0" + Hours;
			}

			var Mins = String(date.getMinutes());
			if (Mins.length !== 2) {
				Mins = "0" + Mins;
			}

			var Secs = String(date.getSeconds());
			if (Secs.length !== 2) {
				Secs = "0" + Secs;
			}

			var dateTimeString = date.getFullYear() + "-" + Month + "-" + Day + "T" +
				Hours + ":" + Mins + ":" + Secs + "." + date.getMilliseconds() + "Z";

			return dateTimeString;
		}

	});
});