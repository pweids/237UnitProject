var libraryXML
function loadXML{
	var libraryXML = document.implementation.createDocument("","",null);
	libraryXML.load("library.xml");
	libraryXML.onload=parseXML;
}
function {
	console.log(libraryXML);
}