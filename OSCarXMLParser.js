/*
	OSCar XML file to Chataigne OSC module builder scripts
	V0 MD 18/05/2021

	Use an OSCar configuration file to fill the OSC module with new Values accordingly :
	- object index
	- name of parameter
	- OSC pattern
	- min value range
	- max value range
	- default value

	Just add the script to an OSC module, choose the file in module parameters
	*/

// Add scripts parameters to GUI
var OSCarXMLFile = local.scripts.addFileParameter("XML OSCar configuration file","Choose the configuration file to use"); 
var NewObjectID = local.scripts.addIntParameter("New object ID", "choose the ID and click on the button to create a new object", 1);
var AddNewObject = local.scripts.addTrigger("Create a new object", "object ID is set above");
var NewObjectID = local.scripts.addIntParameter("Number of new objects", "Push the button below to create several new objects", 1);
var AddNewObject = local.scripts.addTrigger("Create several new objects", "Amount of objects is set above");

// Global variables and constants
var OSCarXMLString = "";

function init()
{
}

function scriptParameterChanged(param)
{
	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());
		if (param.name=="xmlOSCarConfigurationFile")
		{
			OSCarXMLString = util.readFile(OSCarXMLFile.get());
			OSCarConfig = parseXML(OSCarXMLString);
			if (OSCarConfig == null) // à remplacer avec un test sur 
			{
				util.showMessageBox("Invalid file. Please reselect a valid XML file in module parameters", "warning", "Got it");
			}
			else
			{
				script.log("Parsing object strucutre fomr XML ok");
			}
		}
	}else 
	{
		script.log("Module parameter triggered : "+param.name);
		// Here will be the functions call for object structure & index to module.values creation
	}
}


 /**
 * Simple XML parser
 * @param {String} xml
 * @return {Object}
 */
 function parseXML(xml) {

    var beg = -1;
    var end = 0;
    var tmp = 0;
    var current = [];
    var obj = {};
    var from = -1;

    while (true) {

        beg = xml.indexOf('<', beg + 1);
        if (beg === -1)
            break;

        end = xml.indexOf('>', beg + 1);
        if (end === -1)
            break;

        var el = xml.substring(beg, end + 1);
        var c = el[1];

        if (c === '?' || c === '/') {

            var o = current.pop();

            if (from === -1 || o !== el.substring(2, el.length - 1))
                continue;

            var path = current.join('.') + '.' + o;
            var value = xml.substring(from, beg);

            if (typeof(obj[path]) === 'undefined')
                obj[path] = value;
            //else if (obj[path] instanceof Array)	// erreur sur instanceof ?
            //    obj[path].push(value);
            else
                obj[path] = [obj[path], value];

            from = -1;
            continue;
        }

        tmp = el.indexOf(' ');
        var hasAttributes = true;

        if (tmp === -1) {
            tmp = el.length - 1;
            hasAttributes = false;
        }

        from = beg + el.length;

        var isSingle = el[el.length - 2] === '/';
        var name = el.substring(1, tmp);

        if (!isSingle)
            current.push(name);

        if (!hasAttributes)
            continue;

        //var match = el.match(/\w+\=\".*?\"/g); 	// erreur sur .match ? RegExp implémenté ?
        if (match === null)
            continue;

        var attr = {};
        var length = match.length;

        for (var i = 0; i < length; i++) {
            var index = match[i].indexOf('"');
            attr[match[i].substring(0, index - 1)] = match[i].substring(index + 1, match[i].length - 1);
        }

        obj[current.join('.') + (isSingle ? '.' + name : '') + '[]'] = attr;
    }

    return obj;
};