# Getting Started
Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose  | Comments
---------|----------|--------------
`app/` | content for UI frontends goes here | UI for this project is handled by SAPUI5
`db/` | your domain models and data go here | We have defined models for Order and Material 
`srv/` | your service models and code go here | Service Definition and Implementation files are available here
`package.json` | project metadata and configuration | All required packages are mentioned here  
`readme.md` | this getting started guide  | Steps and necessary information to execute the Project is mentioned here

## Learn More
Learn more at https://cap.cloud.sap/docs/get-started/.


## About this Project

### Install SAP-CDS Globally by executing 
`npm i -g @sap/cds-dk`

### Create a folder and go to command prompt for the folder and execute below code
`cds init`

Above code creates app,db,srv folders and pacakge.json file and other files


### Open this folder in Visual Studio Code

####  Create Schema file in the **db** folder
Here we create a models which are used in our project
Model is a structure fields and its data types

##### Schema Example
```
entity Materials{
  key Material : String;
  ImageData: String;  
  ImageContentType: String @Core.IsMediaType;
  Description : String 
};
```
Here Materials is a Model name. 
It contain Material as Key and of data type String, ImageData as String, ImageContentType as String and Description as String

####  Update Node Module
`npm install`  Install all depedet npm modules
`npm install mongodb express @sap/cds const @sap/cds-odata-v2-adapter-proxy` Install other relevant modules

####  Create service definition and implementation in *srv* folder
.cds file will have service definition
.js file will have service implementation

##### Service Definition Example
```
service MyMaterials1 @(path: '/odata/mongodb/MyMaterials')
{
   entity Materials as projection on my.Materials; 
}

service MyMaterials2
{
   entity Materials as projection on my.Materials; 
}
```
Here we have two services MyMaterials1 and MyMaterials2.
Service definition can contain multiple entities. 

MyMaterials1 Service is called by path /odata/mongodb/MyMaterials/Materials 
and MyMaterials2 called by path /MyMaterials2/Materials 

##### Service Implementation Example
```
this.on("READ", Materials, _getMaterials);

_getOrders : function(){
 return ..;
};
```
Service Implementation can implement all/any of Read/Write/Change/Delete methods
Function _getMaterials will be called for implementing Read operation  

####  Implement Server.js file
##### Server.js is used to attach express requests to CDS requests to get as OData V4
##### to get Odata V2, which is consumable by SAPUI5 in SAP WebIDE use module @sap/cds-odata-v2-adapter-proxy

####  Chnages to project.json file
Mention Node engine to the project.json file
```
    "engines": {
        "node": "^8.9"
    },
```
Replace npx cds with node server.js 
```
    "scripts": {
        "start": "node server.js"
    }
```
####  Save the project and from terminal in Visual Studio Code, execute below code
`node server.js`

####  Execute below urls to consume Odata Services
To execute Read Operation on Orders Service, execute below url from Bowser or Postman, Fetch all Orders

Below URL is of OData V4
[http://localhost:5007/odata/mongodb/MyOrders/Orders](http://localhost:5007/odata/mongodb/MyOrders/Orders)

Below URL is of OData V2
[http://localhost:5007/v2/odata/mongodb/MyOrders/Orders](http://localhost:5007/v2/odata/mongodb/MyOrders/Orders)

Fetch Orders based on Date&Time Range
for OData V4
[http://localhost:5007/odata/mongodb/MyOrders/Orders?$filter=(OrderCreatedOn ge '2020-12-08T17:41:01.103Z' and OrderCreatedOn le '2020-12-09T17:41:01.103Z')](http://localhost:5007/odata/mongodb/MyOrders/Orders?$filter=(OrderCreatedOn ge '2020-12-08T17:41:01.103Z' and OrderCreatedOn le '2020-12-09T17:41:01.103Z'))

For OData V2
[http://localhost:5007/v2/odata/mongodb/MyOrders/Orders?$filter=(OrderCreatedOn ge '2020-12-08T17:41:01.103Z' and OrderCreatedOn le '2020-12-09T17:41:01.103Z')]
(http://localhost:5007/v2/odata/mongodb/MyOrders/Orders?$filter=(OrderCreatedOn ge '2020-12-08T17:41:01.103Z' and OrderCreatedOn le '2020-12-09T17:41:01.103Z'))
