//import node file module.
var path=require('path');
var fs=require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
function getFilesList(ext){
	var files=[];
	var dir=fs.readdir("node_modules",function (err, list) 
	{
		if (err)
			return console.error('There was an error reading files:', err)
		if(list==null)
			return console.error('The file list is null:');
			console.log("Files lent=="+list.length)
		for(var i=0;i<list.length;i++)
			{
				if (list[i].endsWith("."+ext))
				{
					console.log(list[i]);
				}
			}
	});
}
function readFileContent(fileName){
	if(fileName==null){
		return console.error('Please provide a valid filename:');
	}
	var bufferRead=fs.readFileSync(fileName);
	if(bufferRead==null){
		return console.error('Failed to read from '+fileName);
	}
	return bufferRead.toString();
 
	
}
function readHtmlFileSection(fileName,htmlTag){
	if(fileName==null){
		return console.error('Please provide a valid filename:');
	}
	var strContent=readFileContent(fileName);
	if(strContent==null){
		return console.error('Failed to read from '+fileName);
	}
	var beginTag="<link "
	var endTag="/>"
	var beginTagIndex=strContent.indexOf(beginTag);
	var endTagIndex=strContent.indexOf(endTag);
	console.log("The index of "+beginTag+" is "+beginTagIndex+" that of "+endTag+" is "+endTagIndex);
	
	var subString=strContent.substring(beginTagIndex,endTagIndex);
    console.log("The extracted subString is:\n "+subString);
	return subString;
}
/**
filesFolder: This is the folder Name containing either the html or js files-depending on the extension.
tag: This is either the html tag or the js keyword to look for in the corresponding files.
markUpToWrite: This is the mark up or the javascript code to insert in corresponding the html or js file.
ext: This is the extension-This could be done dynamically using already existing node-libraries but I don't want to install libraries for a small task like this.
**/
function searchFileForKeywordAndInsertIfNotFound(filesFolder,tag,markUpToWrite,ext)
{
	if(filesFolder==null){
		return console.error('Please provide a valid filename:');
	}
	var fileLists=[];
	var countJsFileLoop=0;
	var absFolderPath=path.join(__dirname,filesFolder);
	ListOfFilteredFiles(absFolderPath,fileLists,ext) // Get the Lists of all the Js or html files in the project folder
	console.log("The Length of Js file Lists is::"+fileLists.length)
	for(var i=0;i<fileLists.length;i++)
	{
		var currentFileName=fileLists[i];//get the current file. Either js or html.
		console.log("Absolute Folder Joined Path is::"+path.join(absFolderPath,currentFileName));
		var strContent=readFileContent(path.join(absFolderPath,currentFileName));// read the file contents.
		if(strContent==null){
		return console.error('Failed to read from '+filesFolder);//ML
	}
	var beginHeadIndex=0;//holds the index of the the tag
	if(ext=="js")//Is it a js file?
	{
		
		beginHeadIndex=strContent.indexOf(tag);
		countJsFileLoop++;// This helps to avoid creating and writing on both sw.js and serviceWorkerReg.js every time the loop enter this block.
		//Better and more realistically search all the available js files for the presence of the tag. Eg: 'navigator.serviceWorker' to know if serviceWorker
		// is registered or not.
		if(beginHeadIndex==-1 && countJsFileLoop==fileLists.length) //Is this tag not found in the js file? Meaning serviceWorker is not registered
		{
			beginHeadIndex=10 // start writing from the line or index 10- almost the begnning of the file.
			var serviceWorkerRegfileName="serviceWorkerReg"
			var serviceWorkerfileName="sw"
			var serviceWorkerContent=readFileContent("pwa-custom-codes/sw.js");
			CreateJSFileAndWriteOnIt(path.join(absFolderPath,serviceWorkerfileName),serviceWorkerContent,"js");// Creat serviceWorker to be included in serviceWorkerReg.js called 'sw.js'
			CreateJSFileAndWriteOnIt(path.join(absFolderPath,serviceWorkerRegfileName),markUpToWrite,"js"); //create serviceWorker Registration file and code called 'serviceWorkerReg.js'
			
			tagValue="serviceWorkerReg.js and sw.js were successfully created and written on";
		}
		else if(beginHeadIndex>1 && countJsFileLoop==fileLists.length){ //Thus serviceWorker is registered
			//Repeat the above step-incase the developer failed to add some features like: push, install and caches.
			beginHeadIndex=10 // start writing from the line or index 10- almost the begnning of the file.
			var serviceWorkerRegfileName="serviceWorkerReg"
			var serviceWorkerfileName="sw"
			var serviceWorkerContent=readFileContent("pwa-custom-codes/sw.js");
			CreateJSFileAndWriteOnIt(serviceWorkerfileName,serviceWorkerContent,"js");// Creat serviceWorker to be included in serviceWorkerReg.js called 'sw.js'
			CreateJSFileAndWriteOnIt(serviceWorkerRegfileName,markUpToWrite,"js"); //create serviceWorker Registration file and code called 'serviceWorkerReg.js'
			// Finally add the tag '<script defer src="serviceWorkerReg.js"></script>' to the head session of each html file.
			console.log("Service Worker Already Registered Though, However: serviceWorkerReg.js and sw.js were still created for the developer ")
			
		}
		else if(beginHeadIndex>1 && countJsFileLoop<fileLists.length)//Is the tag found in at least one-current js file?
			return console.error('Oooops!!! found  '+tag+' in '+currentFileName+" thus can't create serviceWorkerReg.js and sw.js for this web app");
		
	}
	else // must be html file  then.
	{
		var dom = new JSDOM(strContent);
		try{
			console.log("The tag to query is::"+tag)
			tagValue=dom.window.document.documentElement.querySelector(tag).outerHTML
		}
		catch(err){
			tagValue=null;
			console.log("The caught error for "+tag+" is :::"+err);
			beginHeadIndex=strContent.indexOf("<head>");
			if(beginHeadIndex==-1)
				return console.error('Failed to find head tag in '+path.join(filesFolder,currentFileName));
			var endHeadIndex=strContent.indexOf("</head>");
			console.log("BeginHead Index=="+beginHeadIndex+" EndHeadIndex=="+endHeadIndex);
			markUpToWrite=" "+markUpToWrite+"     ";//This gives extra 5 spaces after writing the markUp.
			markUpToWrite+="\n"
			file_content = strContent.substring(beginHeadIndex+tag.length+2);// Number 2 here makes the newly inserted markup move further away from the head tag.
			
			var file = fs.openSync(path.join(absFolderPath,currentFileName),'r+');
			var bufferedText = new Buffer(markUpToWrite+file_content);
			fs.writeSync(file, bufferedText, 0, bufferedText.length, beginHeadIndex+tag.length+2);// Number 2 here makes the newly inserted markup move further away from the head tag.
			console.log("Successfully wrote "+markUpToWrite+" to "+currentFileName)
			fs.close(file);
		}			
    }
 }
 console.log("outerHTML Result for "+tag+" is :::"+tagValue);
 return tagValue;
}
/**
Recursivel Return List of Filtered Files.
**/
var ListOfFilteredFiles = function(dir, filelist,ext) {
            var path = path || require('path');
            var fs = fs || require('fs'),
                files = fs.readdirSync(dir);
            filelist = filelist || [];
            files.forEach(function(file) {
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    filelist = walkSync(path.join(dir, file), filelist);
                }
                else {
					if (file.endsWith("."+ext))
						filelist.push(file);
                }
            });
			
            return filelist;
        };

function CreateJSFileAndWriteOnIt(fileName,contentToWrite,ext){
	fileName=fileName+"."+ext
	var file = fs.openSync(fileName,'w');
	if(file!=null){
		console.log(fileName+" was successfully created")
		var bufferedText = new Buffer(contentToWrite);
		fs.writeSync(file, contentToWrite);
		fs.close(file);
		if(fs!=null)
			return true;
		return false;
	}
	else{
		return false;
	}
}
/**
This algorithm puts everything together and converts the app to pwa.
webAppHomeFolder: This is the folder that houses the whole webapp files-especially the static files-in the future versions, this will be separated.
NB:The folder-also for this intitial version-must be found inside this npm package folder-where the node js-pwaAlg.js-is located.
**/
function convertWebAppToPwa(webAppHomeFolder)
{
	var metaTagMarkUpToWrite="<meta name=\"viewport\" content=\"width=device-width, user-scalable=no\" />";
	console.log("Searching for  "+metaTagMarkUpToWrite+" to insert if not found.... ")
	console.log("The keyword TagValue is::"+searchFileForKeywordAndInsertIfNotFound(webAppHomeFolder,"meta",metaTagMarkUpToWrite,"html"))
	var linkTagMarkUpToWrite="<link rel=\"manifest\" href=\"manifest.json\" />";
	console.log("Searching for  "+linkTagMarkUpToWrite+" to insert if not found.... ")
	//console.log("The keyword TagValue is::"+searchFileForKeywordAndInsertIfNotFound(webAppHomeFolder,"link",linkTagMarkUpToWrite,"html"))
	var SvcWorkerRegContentMarkUpToWrite=readFileContent("pwa-custom-codes/site.js");
	var tag="navigator.serviceWorker"
	//"self1";
	console.log("Searching for ServiceWorker Registration  and  "+tag+" to register if not found.... ")
	console.log("The keyword TagValue  for tag "+tag+" is::"+searchFileForKeywordAndInsertIfNotFound(webAppHomeFolder,tag,SvcWorkerRegContentMarkUpToWrite,"js"))
	var serviceWorkerJsTagMarkUpToWrite="<script defer src=\"test-web-apps/serviceWorkerReg.js\"></script>";
	console.log("Searching for  "+serviceWorkerJsTagMarkUpToWrite+" in all .html files to insert if not found.... ")
	console.log("The keyword TagValue is::"+searchFileForKeywordAndInsertIfNotFound(webAppHomeFolder,"script",serviceWorkerJsTagMarkUpToWrite,"html"))
	var manifesJsonCodeToWrite=readFileContent(__dirname+"/pwa-custom-codes/manifest.json");
	console.log("Creating manifest.json.... ")
	console.log("The boolean is::"+CreateJSFileAndWriteOnIt(path.join(webAppHomeFolder,"manifest"),manifesJsonCodeToWrite,"json"));
	var manifestPath=path.join(webAppHomeFolder,"manifest.json")
	var manifesJsonTagMarkUpToWrite="<link rel=\"manifest\" href=\"test-web-apps/manifest.json\" />";
	console.log("Finally Searching for  "+manifesJsonTagMarkUpToWrite+" in all .html files to insert if not found.... ")
	console.log("The keyword TagValue is::"+searchFileForKeywordAndInsertIfNotFound(webAppHomeFolder,"link",manifesJsonTagMarkUpToWrite,"html"))
	console.log("Successfully Converted the WebApp in Folder "+webAppHomeFolder+" to Progressive Web App-PWA")
}

//Test and Run this algorithm
convertWebAppToPwa("test-web-apps");//Note: test-web-apps is the sample test web app.//Every file is in the same folder for now. In later versions,they will be separated
