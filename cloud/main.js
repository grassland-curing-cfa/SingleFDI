/*
 * Cloud code for the trial SingleFDI project with Fuel Load Amendments work combined
 *
 * Cloud code for "singlefdi-trial-dev" connected to the "singlefdi" MongoLab DB deployed on Heroku
 * Git repo: 				https://github.com/grassland-curing-cfa/SingleFDI
 * Initial checkin date:	27/10/2016
 * Following-up check date:	13/12/2016: NEMP-1-151: Remove unnecessary Parse.User.logIn(SUPERUSER, SUPERPASSWORD) and Parse.Cloud.useMasterKey() in the Cloud function
 */

var _ = require('underscore');
var moment = require('moment');

var APP_ID = process.env.APP_ID;
var MASTER_KEY = process.env.MASTER_KEY;
var SERVER_URL = process.env.SERVER_URL;
var APP_NAME = process.env.APP_NAME;

var MG_DOMAIN = process.env.MG_DOMAIN;
var MG_KEY = process.env.MG_KEY;
var MG_MAIL_LIST_NAME = process.env.MG_MAIL_LIST_NAME;
var MG_FLA_MAIL_LIST_NAME = process.env.MG_FLA_MAIL_LIST_NAME;
var MG_SFDI_MAIL_SUBJUST_PREFIX = process.env.MG_SFDI_MAIL_SUBJUST_PREFIX;
var MG_FLA_MAIL_SUBJUST_PREFIX = process.env.MG_FLA_MAIL_SUBJUST_PREFIX;
var MG_FB_MAIL_SUBJUST_PREFIX =  process.env.MG_FB_MAIL_SUBJUST_PREFIX;
var CFA_NEMP_EMAIL = process.env.EMAIL_ADDR_CFA_NEMP;
var CFA_GC_TEAM_EMAIL = process.env.EMAIL_ADDR_CFA_GC_TEAM;

var FILES_OLDER_THAN_DAYS = process.env.FILES_OLDER_THAN_DAYS

//Use Parse.Cloud.define to define as many cloud functions as you want.
//For example:
Parse.Cloud.define("hello", function(request, response) {
	response.success("Hello world from " + APP_NAME);
});

/**
 * Removes the associated file uploaded before the "SFDI_UPLOADED" record is deleted
 */
Parse.Cloud.beforeDelete("SFDI_UPLOADED", function(request, response) {
	// Checks if "UploadedFile" has a value
	if (request.object.has("UploadedFile")) {

	    var file = request.object.get("UploadedFile");
	    var fileName = file.name();
	    console.log(file.name());
	    Parse.Cloud.httpRequest({
	    	method: 'DELETE',
	        url: SERVER_URL + "/files/" + fileName,
	        headers: {
	        	"X-Parse-Application-Id": APP_ID,
	        	"X-Parse-Master-Key" : MASTER_KEY
	        },
	        success: function(httpResponse) {
	        	console.log('Deleted the file associated with the SFDI_UPLOADED record successfully.');
	        	response.success();
	        },
	        error: function(httpResponse) {
	        	console.error('Delete failed with response code ' + httpResponse.status + ':' + httpResponse.text);
	        	response.error()
	        }
	    });
	} else {
		console.log('SFDI_UPLOADED object to be deleted does not have an associated UploadedFile (File). No UploadedFile to be deleted.');
		response.success();
	}
});

/**
 * Removes the associated file uploaded before the "FuelBasedFDR_ICC" record is deleted
 */
Parse.Cloud.beforeDelete("FuelBasedFDR_ICC", function(request, response) {
	// Checks if "UploadedFile" has a value
	if (request.object.has("UploadedFile")) {

	    var file = request.object.get("UploadedFile");
	    var fileName = file.name();
	    console.log(file.name());
	    Parse.Cloud.httpRequest({
	    	method: 'DELETE',
	        url: SERVER_URL + "/files/" + fileName,
	        headers: {
	        	"X-Parse-Application-Id": APP_ID,
	        	"X-Parse-Master-Key" : MASTER_KEY
	        },
	        success: function(httpResponse) {
	        	console.log('Deleted the file associated with the FuelBasedFDR_ICC record successfully.');
	        	response.success();
	        },
	        error: function(httpResponse) {
	        	console.error('Delete failed with response code ' + httpResponse.status + ':' + httpResponse.text);
	        	response.error()
	        }
	    });
	} else {
		console.log('FuelBasedFDR_ICC object to be deleted does not have an associated UploadedFile (File). No UploadedFile to be deleted.');
		response.success();
	}
});

/**
 * Removes the associated file uploaded before the "FuelBasedFDR_LGA" record is deleted
 */
Parse.Cloud.beforeDelete("FuelBasedFDR_LGA", function(request, response) {
	// Checks if "UploadedFile" has a value
	if (request.object.has("UploadedFile")) {

	    var file = request.object.get("UploadedFile");
	    var fileName = file.name();
	    console.log(file.name());
	    Parse.Cloud.httpRequest({
	    	method: 'DELETE',
	        url: SERVER_URL + "/files/" + fileName,
	        headers: {
	        	"X-Parse-Application-Id": APP_ID,
	        	"X-Parse-Master-Key" : MASTER_KEY
	        },
	        success: function(httpResponse) {
	        	console.log('Deleted the file associated with the FuelBasedFDR_LGA record successfully.');
	        	response.success();
	        },
	        error: function(httpResponse) {
	        	console.error('Delete failed with response code ' + httpResponse.status + ':' + httpResponse.text);
	        	response.error()
	        }
	    });
	} else {
		console.log('FuelBasedFDR_LGA object to be deleted does not have an associated UploadedFile (File). No UploadedFile to be deleted.');
		response.success();
	}
});

/**
 * Removes the associated file uploaded before the "FLA_UPLOADED" record is deleted
 */
Parse.Cloud.beforeDelete("FLA_UPLOADED", function(request, response) {
	// Checks if "UploadedFile" has a value
	if (request.object.has("UploadedFile")) {

	    var file = request.object.get("UploadedFile");
	    var fileName = file.name();
	    console.log(file.name());
	    Parse.Cloud.httpRequest({
	    	method: 'DELETE',
	        url: SERVER_URL + "/files/" + fileName,
	        headers: {
	        	"X-Parse-Application-Id": APP_ID,
	        	"X-Parse-Master-Key" : MASTER_KEY
	        },
	        success: function(httpResponse) {
	        	console.log('Deleted the file associated with the FLA_UPLOADED record successfully.');
	        	response.success();
	        },
	        error: function(httpResponse) {
	        	console.error('Delete failed with response code ' + httpResponse.status + ':' + httpResponse.text);
	        	response.error()
	        }
	    });
	} else {
		console.log('FLA_UPLOADED object to be deleted does not have an associated UploadedFile (File). No UploadedFile to be deleted.');
		response.success();
	}
});


/**
 * Remove the SFDI_UPLOADED records that are more than 7 days old after a new record is inserted
 */
 /*
Parse.Cloud.afterSave("SFDI_UPLOADED", function(request) {
	var SFDItodelete = [];
	var count = 0;
	
	query = new Parse.Query("SFDI_UPLOADED");
	query.descending("createdAt");
	query.find().then(function(results) {
		for (var i = 0; i < results.length; i++) {
			// Find records that over FILES_OLDER_THAN_DAYS days old;
			if (moment().diff(moment(results[i].createdAt), 'days') > FILES_OLDER_THAN_DAYS) {
				SFDItodelete.push(results[i]);
				console.log("SFDI_UPLOADED createdAt [" + results[i].createdAt + "] is more than " + FILES_OLDER_THAN_DAYS + " days old - to be deleted");
			}
		}
		count = SFDItodelete.length;
		
		// Remove those records that meet the criteria
		return Parse.Object.destroyAll(SFDItodelete);
	}).then(function() {
		console.log('Count of SFDI_UPLOADED records that have been deleted is ' + count);
	}, function(error) {
		console.error("Got an error in destroyAll() " + error.code + " : " + error.message);
	});	
});
*/

/**
 * Remove the FLA_UPLOADED records that are more than 7 days old after a new record is inserted
 */
Parse.Cloud.afterSave("FLA_UPLOADED", function(request) {
	var FLAtodelete = [];
	var count = 0;
	
	query = new Parse.Query("FLA_UPLOADED");
	query.descending("createdAt");
	query.find().then(function(results) {
		for (var i = 0; i < results.length; i++) {
			// Find records that over FILES_OLDER_THAN_DAYS days old;
			if (moment().diff(moment(results[i].createdAt), 'days') > FILES_OLDER_THAN_DAYS) {
				FLAtodelete.push(results[i]);
				console.log("FLA_UPLOADED createdAt [" + results[i].createdAt + "] is more than " + FILES_OLDER_THAN_DAYS + " days old - to be deleted");
			}
		}
		count = FLAtodelete.length;
		
		// Remove those records that meet the criteria
		return Parse.Object.destroyAll(FLAtodelete);
	}).then(function() {
		console.log('Count of FLA_UPLOADED records that have been deleted is ' + count);
	}, function(error) {
		console.error("Got an error in destroyAll() " + error.code + " : " + error.message);
	});	
});

// Remove the SFDI_UPLOADED records that are more than 7 days old after a new record is inserted 
Parse.Cloud.define("deleteOldSFDI", function(request, response) {
	var SFDItodelete = [];
	var count = 0;
	
	query = new Parse.Query("SFDI_UPLOADED");
	query.descending("createdAt");
	query.find().then(function(results) {
		for (var i = 0; i < results.length; i++) {
			// Find records that over FILES_OLDER_THAN_DAYS days old;
			if (moment().diff(moment(results[i].createdAt), 'days') > FILES_OLDER_THAN_DAYS) {
				SFDItodelete.push(results[i]);
				console.log("SFDI_UPLOADED createdAt [" + results[i].createdAt + "] is more than " + FILES_OLDER_THAN_DAYS + " days old - to be deleted");
			}
		}
		count = SFDItodelete.length;
		
		// Remove those records that meet the criteria
		return Parse.Object.destroyAll(SFDItodelete);
	}).then(function() {
		console.log('Count of SFDI_UPLOADED records that have been deleted is ' + count);
		response.success(true);
	}, function(error) {
		console.error("Got an error in destroyAll() " + error.code + " : " + error.message);
		response.error("Got an error in destroyAll()");
	});
});

// Remove the FuelBasedFDR_ICC records that are more than 7 days old after a new record is inserted 
Parse.Cloud.define("deleteOldFuelBasedFDRICC", function(request, response) {
	var SFDItodelete = [];
	var count = 0;
	
	query = new Parse.Query("FuelBasedFDR_ICC");
	query.descending("createdAt");
	query.find().then(function(results) {
		for (var i = 0; i < results.length; i++) {
			// Find records that over FILES_OLDER_THAN_DAYS days old;
			if (moment().diff(moment(results[i].createdAt), 'days') > FILES_OLDER_THAN_DAYS) {
				SFDItodelete.push(results[i]);
				console.log("FuelBasedFDR_ICC createdAt [" + results[i].createdAt + "] is more than " + FILES_OLDER_THAN_DAYS + " days old - to be deleted");
			}
		}
		count = SFDItodelete.length;
		
		// Remove those records that meet the criteria
		return Parse.Object.destroyAll(SFDItodelete);
	}).then(function() {
		console.log('Count of FuelBasedFDR_ICC records that have been deleted is ' + count);
		response.success(true);
	}, function(error) {
		console.error("Got an error in destroyAll() " + error.code + " : " + error.message);
		response.error("Got an error in destroyAll()");
	});
});

// Remove the FuelBasedFDR_LGA records that are more than 7 days old after a new record is inserted 
Parse.Cloud.define("deleteOldFuelBasedFDRLGA", function(request, response) {
	var SFDItodelete = [];
	var count = 0;
	
	query = new Parse.Query("FuelBasedFDR_LGA");
	query.descending("createdAt");
	query.find().then(function(results) {
		for (var i = 0; i < results.length; i++) {
			// Find records that over FILES_OLDER_THAN_DAYS days old;
			if (moment().diff(moment(results[i].createdAt), 'days') > FILES_OLDER_THAN_DAYS) {
				SFDItodelete.push(results[i]);
				console.log("FuelBasedFDR_LGA createdAt [" + results[i].createdAt + "] is more than " + FILES_OLDER_THAN_DAYS + " days old - to be deleted");
			}
		}
		count = SFDItodelete.length;
		
		// Remove those records that meet the criteria
		return Parse.Object.destroyAll(SFDItodelete);
	}).then(function() {
		console.log('Count of FuelBasedFDR_LGA records that have been deleted is ' + count);
		response.success(true);
	}, function(error) {
		console.error("Got an error in destroyAll() " + error.code + " : " + error.message);
		response.error("Got an error in destroyAll()");
	});
});

//Send an email for Fuel-based FDR products (ICC and LGA Trial products) to the State Control Team mail list.
Parse.Cloud.define("sendFuelBasedFDREmailToUsers", function(request, response) {
	var rawStrToday = request.params.dateString;	// in the format of "%d_%m_%Y"
	var strToday = rawStrToday.replace(/_/g, '/');

	var iccUploadedURL = null;
	var igaUploadedURL = null;
	
	// Query FuelBasedFDR_ICC class
	var queryICC = new Parse.Query("FuelBasedFDR_ICC");
	queryICC.descending("createdAt");
	queryICC.find().then(function(results) {
		console.log("results.length=" + results.length);
		if (results.length < 1) {
			return Parse.Promise.error("There was zero FuelBasedFDR_ICC record found. The sendFuelBasedFDREmailToUsers function terminated here.");
		}

		// results is array of FuelBasedFDR_ICC records
		// We only care about the most recent one
		var iccUploaded = results[0];
		iccUploadedURL = iccUploaded.get("UploadedFileUrl");
		
		console.log("The most recent FuelBasedFDR_ICC uploaded file Url: " + iccUploadedURL)

		// Query FuelBasedFDR_LGA class
		var queryLGA = new Parse.Query("FuelBasedFDR_LGA");
		queryLGA.descending("createdAt");
		return queryLGA.find();
	}, function(error) {
		console.log("There was an error in finding FuelBasedFDR_ICC.");
		return Parse.Promise.error("There was an error in finding FuelBasedFDR_ICC.");
	}).then(function(results) {
		if (results.length < 1) {
			return Parse.Promise.error("There was zero FuelBasedFDR_LGA record found. The sendFuelBasedFDREmailToUsers function terminated here.");
		}

		// results is array of FuelBasedFDR_LGA records
		// We only care about the most recent one
		var lgaUploaded = results[0];
		igaUploadedURL = lgaUploaded.get("UploadedFileUrl");
		
		console.log("The most recent FuelBasedFDR_LGA uploaded file Url: " + igaUploadedURL)

		// Send the email only when neither ICC nor IGA is null or undefined.
		if ( (iccUploadedURL) && (igaUploadedURL) ) {
			//
			// use Mailgun to send email
			var mailgun = require('mailgun-js')({apiKey: MG_KEY, domain: MG_DOMAIN});
			
			var htmlString = 
						'<!DOCTYPE html><html>' + 
						'<head>' + 
						'<title>Fuel Based FDR reports</title>' + 
						'<style>' + 
						'p, li {margin:0cm; margin-bottom:.0001pt; font-size:11.0pt; font-family:"Calibri","sans-serif";}' + 
						'</style>' + 
						'</head>' + 
						'<body>' + 
						'<p>Hello %recipient_fname%,</p>' + 
						//'<p>Hello all,</p>' + 
						'<br>' + 
						'<p>For your information, the daily <strong>Fuel Based FDR reports</strong> have been updated ' + strToday + '. Please click the following links:</p>' + 
						'<ul>' +
						'<li><a href="' + iccUploadedURL + '" target="_top">Fuel Based FDR for each ICC Footprint</a> (file size: approx. 7 MB), and</li>' +
						'<li><a href="' + igaUploadedURL + '" target="_top">Fuel Based FDR for each LGA (TRIAL)</a> (file size: approx. 10 MB)</li>' +
						'</ul>' + 
						'<br>' + 
						'<p>Please note: the updated reports will also be available on <a href="http://cop.em.vic.gov.au/sadisplay/nicslogin.seam" target="_top">EM-COP</a> after 7.45 am daily. You can navigate to "DESKTOP" -> "Weather" -> "Vic Briefings & Outlooks" and find the reports.</p>' + 
						'<br>' + 
						'<p>If the reports do not display properly in your web browser, please save it to your computer and view directly using Acrobat Reader.</p>' + 
						'<br>' + 
						'<p>Kind Regards,</p>' + 
						'<p>The CFA Grassland Curing Team</p>' + 
						'<br>' + 
						'<table><tr><td width="25%"><img src="http://www.cfa.vic.gov.au/img/logo.png" width="64" height="64" alt="CFA_LOGO" /></td>' + 
						'<td><p style="color:#C00000; font-weight: bold;">CFA Grassland Curing Team</p><p>CFA HQ - Fire & Emergency Management</p><p>8 Lakeside Drive, Burwood East, Victoria 3151</p>' + 
						'<p>E: <a href="mailto:' + CFA_GC_TEAM_EMAIL + '" target="_top">' + CFA_GC_TEAM_EMAIL + '</a></p></td></tr></table>' + 
						'<br>' + 
						'</body>' + 
						'</html>';
			
			var result = null;

			var data = {
				to: MG_MAIL_LIST_NAME,
				//cc: CFA_NEMP_EMAIL,
				from: CFA_GC_TEAM_EMAIL,
				subject: MG_FB_MAIL_SUBJUST_PREFIX + strToday,
				text: "",
				html: htmlString
			};

			mailgun.messages().send(data, function (error, body) {
				if (error) {
					console.log(error);
					result = {
						"result": false,
						"details": error
					};
					response.error(result);
				} else {
					console.log(body);
					result = {
						"result": true,
						"details": JSON.stringify(body)
					};
					response.success(result);
				}
			});
			//
		} else {
			console.log("The Email was not sent. Reason: Unable to find either FuelBasedFDR_ICC or FuelBasedFDR_LGA. iccUploadedURL = " + iccUploadedURL + "; igaUploadedURL = " + igaUploadedURL)
		}
	}, function(error) {
		response.error("Error: " + error.code + " " + error.message);
	});

});

//Send an email for SingleFDI_Trial product to the State Control Team mail list.
Parse.Cloud.define("sendSingleFDIEmailToUsers", function(request, response) {
	var rawStrToday = request.params.dateString;	// in the format of "%d_%m_%Y"
	var strToday = rawStrToday.replace(/_/g, '/');
	
	var querySFDI = new Parse.Query("SFDI_UPLOADED");
	querySFDI.descending("createdAt");
	querySFDI.find().then(function(results) {
		// results is array of SFDI_UPLOADED records
		// We only care about the most recent one
		var sfdiUploaded = results[0];
		var sfdiUploadedUrl = sfdiUploaded.get("UploadedFileUrl");
		
		console.log("The most recent SingleFDI uploaded file Url: " + sfdiUploadedUrl)
		
		// use Mailgun to send email
		var mailgun = require('mailgun-js')({apiKey: MG_KEY, domain: MG_DOMAIN});
		
		var htmlString = 
					'<!DOCTYPE html><html>' + 
					'<head>' + 
					'<title>Single FDI Trial product</title>' + 
					'<style>' + 
					'p, li {margin:0cm; margin-bottom:.0001pt; font-size:11.0pt; font-family:"Calibri","sans-serif";}' + 
					'</style>' + 
					'</head>' + 
					'<body>' + 
					'<p>Hello %recipient_fname%,</p>' + 
					//'<p>Hello all,</p>' + 
					'<br>' + 
					'<p>For your information, the daily <strong>Fuel Based FDI Trial Report</strong> has been updated ' + strToday + '. To view the report (file size: approx. 10 MB), please click the link <a href="' + sfdiUploadedUrl + '" target="_top">here</a>.</p>' + 
					'<br>' + 
					'<p>Please note: the updated report will also be available on <a href="http://cop.em.vic.gov.au/sadisplay/nicslogin.seam" target="_top">EM-COP</a> after 7.45 am daily. You can navigate to "DESKTOP" -> "Weather" -> "Vic Briefings & Outlooks" and find the report.</p>' + 
					'<br>' + 
					'<p>If the report does not display properly in your web browser, please save it to your computer and view directly using Acrobat Reader.</p>' + 
					'<br>' + 
					'<p>Kind Regards,</p>' + 
					'<p>The NEMP Grassland Curing Team</p>' + 
					'<br>' + 
					'<table><tr><td width="25%"><img src="http://www.cfa.vic.gov.au/img/logo.png" width="64" height="64" alt="CFA_LOGO" /></td>' + 
					'<td><p style="color:#C00000; font-weight: bold;">NEMP Grassland Curing Team</p><p>CFA HQ - Fire & Emergency Management</p><p>8 Lakeside Drive, Burwood East, Victoria 3151</p>' + 
					'<p>E: <a href="mailto:' + CFA_NEMP_EMAIL + '" target="_top">' + CFA_NEMP_EMAIL + '</a></p></td></tr></table>' + 
					'<br>' + 
					'</body>' + 
					'</html>';
		
		var result = null;
		
		/*
		Mailgun.sendEmail({
			to: MG_MAIL_LIST_NAME,
			//to: "a.chen@cfa.vic.gov.au",
			//bcc: recipientList,
			from: CFA_NEMP_EMAIL,
			subject: "Single FDI Trial product " + strToday,
			text: "",
			html: htmlString
			}, {
			success: function(httpResponse) {
				console.log(httpResponse);
				result = {
					"result": true,
					"details": httpResponse.text
				};
				response.success(result);
			},
			error: function(httpResponse) {
				console.error(httpResponse);
				result = {
					"result": false,
					"details": httpResponse.text
				};
				response.error(result);
			}
		});
		*/
		
		//
		var data = {
			to: MG_MAIL_LIST_NAME,
			//cc: CFA_NEMP_EMAIL,
			from: CFA_NEMP_EMAIL,
			subject: MG_SFDI_MAIL_SUBJUST_PREFIX + strToday,
			text: "",
			html: htmlString
		};

		mailgun.messages().send(data, function (error, body) {
			if (error) {
				console.log(error);
				result = {
					"result": false,
					"details": error
				};
				response.error(result);
			} else {
				console.log(body);
				result = {
					"result": true,
					"details": JSON.stringify(body)
				};
				response.success(result);
			}
		});
	}, function(error) {
	    response.error("SFDI_UPLOADED table lookup failed");
	});
});

//Send an email for Fuel_Load_Amendments_Trial product to the State Control Team mail list.
Parse.Cloud.define("sendFuelLoadAmendmentsEmailToUsers", function(request, response) {
	var rawStrToday = request.params.dateString;	// in the format of "%d_%m_%Y"
	var strToday = rawStrToday.replace(/_/g, '/');
	
	var queryFLA = new Parse.Query("FLA_UPLOADED");
	queryFLA.descending("createdAt");
	queryFLA.find().then(function(results) {
		// results is array of FLA_UPLOADED records
		// We only care about the most recent one
		var flaUploaded = results[0];
		var flaUploadedUrl = flaUploaded.get("UploadedFileUrl");
		
		console.log("The most recent Fuel_Load_Amendments uploaded file Url: " + flaUploadedUrl)
		
		// use Mailgun to send email
		var mailgun = require('mailgun-js')({apiKey: MG_KEY, domain: MG_DOMAIN});
		
		var htmlString = 
					'<!DOCTYPE html><html>' + 
					'<head>' + 
					'<title>Fuel Load Amendments Trial product</title>' + 
					'<style>' + 
					'p, li {margin:0cm; margin-bottom:.0001pt; font-size:11.0pt; font-family:"Calibri","sans-serif";}' + 
					'</style>' + 
					'</head>' + 
					'<body>' + 
					//'<p>Hello %recipient%,</p>' + 
					'<p>Hello all,</p>' + 
					'<br>' + 
					'<p>The Fuel Load Amendments trial report has been updated ' + strToday + '. To view the report, please click the link <a href="' + flaUploadedUrl + '" target="_top">here</a>.</p>' + 
					'<br>' + 
					'<p>Please note: If the report does not display properly in your web browser, please save it to your desktop and view directly using Acrobat Reader.</p>' + 
					'<br>' + 
					'<p>Kind Regards,</p>' + 
					'<p>The NEMP Grassland Curing Team</p>' + 
					'<br>' + 
					'<table><tr><td width="25%"><img src="http://www.cfa.vic.gov.au/img/logo.png" width="64" height="64" alt="CFA_LOGO" /></td>' + 
					'<td><p style="color:#C00000; font-weight: bold;">NEMP Grassland Curing Team</p><p>CFA HQ - Fire & Emergency Management</p><p>8 Lakeside Drive, Burwood East, Victoria 3151</p>' + 
					'<p>E: <a href="mailto:' + CFA_NEMP_EMAIL + '" target="_top">' + CFA_NEMP_EMAIL + '</a></p></td></tr></table>' + 
					'<br>' + 
					'<p><i>Note: This email has been automatically generated. Please do not reply to this email.</i></p>' + 
					'</body>' + 
					'</html>';
		
		var result = null;
		
		/*
		Mailgun.sendEmail({
			to: MG_FLA_MAIL_LIST_NAME,
			//to: "a.chen@cfa.vic.gov.au",
			//bcc: recipientList,
			from: CFA_NEMP_EMAIL,
			subject: MG_FLA_MAIL_SUBJUST_PREFIX + strToday,
			text: "",
			html: htmlString
			}, {
			success: function(httpResponse) {
				console.log(httpResponse);
				result = {
					"result": true,
					"details": httpResponse.text
				};
				response.success(result);
			},
			error: function(httpResponse) {
				console.error(httpResponse);
				result = {
					"result": false,
					"details": httpResponse.text
				};
				response.error(result);
			}
		});
		*/
		
		//
		var data = {
			to: MG_FLA_MAIL_LIST_NAME,
			//cc: CFA_NEMP_EMAIL,
			from: CFA_NEMP_EMAIL,
			subject: MG_FLA_MAIL_SUBJUST_PREFIX + strToday,
			text: "",
			html: htmlString
		};

		mailgun.messages().send(data, function (error, body) {
			if (error) {
				console.log(error);
				result = {
					"result": false,
					"details": error
				};
				response.error(result);
			} else {
				console.log(body);
				result = {
					"result": true,
					"details": JSON.stringify(body)
				};
				response.success(result);
			}
		});
	}, function(error) {
	    response.error("FLA_UPLOADED table lookup failed");
	});
});
