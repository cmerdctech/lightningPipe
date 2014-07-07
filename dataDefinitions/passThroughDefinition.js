'use strict';
var qtools = require('qtools');

var schoolFieldList = ["District", "District Type", "School Code", "School Name", "SchoolMinimumGrade", "SchoolMaximumGrade", "SchoolLevelName", "SchoolAreaName", "SuperintendentLastName", "SuperintendentFirstName", "SuperintendentMiddleName", "AreaSuperintendentLastName", "AreaSuperintendentFirstName", "AreaSuperintendentMiddleName", "PrincipalLastName", "PrincipalFirstName", "PrincipalMiddleName", "SchoolPrimaryPhone", "SchoolAlternatePhone", "SchoolFaxNumber", "AddressLine1", "AddressLine2", "AddressLine3", "City Name", "CountyName", "StateCode", "StateName", "ZipCode"]
var termFieldList = ["SchoolYear", "SchoolNumber", "Term Description", "StartDate", "EndDate", "TermType", "Term Number"];

var synthSeq = 0;
var syntheticSequenceNumber = function(itemObj, sourceItem) {
	return synthSeq++;
}

var teacherUffFieldList=["DistrictCode", "Filler2", "StaffUniqueIdentifier",
			"SchoolYearBeg", "SchoolYearEnd", "EmployeeID",
			"LocalStaffCode", "State School/PlantNumber",
			"LastName", "MiddleName", "FirstName", "FullName",
			"JobCode1", "JobCode2", "JobCode3", "JobCode4", "Phone",
			"Email", "Department1", "Department2", "Department3",
			"Department4", "Status", "PrimaryLocationFlag", "Login Name",
			"Password", "Default Password"];
			
var homeroomUffFieldList=["DistrictCode", "DistrictType", "SchoolCode",
			"SectionNumber", "CourseNumber", "TermAbbrev",
			"SchoolYearBeg", "SchoolYearEnd", "Grade", "BeginDate",
			"EndDate", "Location", "HomeroomFlag", "BegPeriodNum",
			"EndPeriodNum", "Credit", "TeamCode", "Track"];
var assignStudentUffFieldList=["DistrictCode", "DistrictType", "SchoolCode",
			"StudentUniqueIdentifier", "StateStudentNumber",
			"LocalStudentNumber", "SchoolYearBeg", "SchoolYearEnd",
			"SectionNumber", "CourseNumber", "GradeLevel",
			"EntryDate", "WithdrawalDate", "EntryType",
			"Withdrawaltype"];
var assignTeacherUffFieldList=["DistrictCode", "DistrictType", "SchoolCode",
			"StaffUniqueIdentifier", "LocalStaffCode",
			"SchoolYearBeg", "SchoolYearEnd", "SectionNumber",
			"CourseNumber", "Grade", "PrimaryInstructorFlag",
			"LastName", "MiddleName", "FirstName"];
var studentUffFieldList=["DistrictCode", "DistrictType", "SchoolCode",
			"SchoolYearBegin", "SchoolYearEnd",
			"StudentUniqueIdentifier", "StateStudentNumber",
			"LocalStudentNumber", "GradeLevel", "Graduation Year",
			"Student Status", "LastName", "MiddleName", "FirstName",
			"Suffix", "Prefix", "FullName", "PreferredName",
			"LastSchoolAttended", "Concurrent Enrollment",
			"BirthDate", "Self Guardian Flag", "Gender", "SSN",
			"BirthPlace", "BirthState", "BirthCountry",
			"EthnicityCode"];
var gradeLevelUffFieldList=["SchoolID",
			"Grade",
			"Grade Description",
			"School Year Begin",
			"School Year End"];

var passThroughDefinition=function(fieldList){
	
	var list=[],
	outObj={};
	for (var i=0, len=list.length; i<len; i++){
		var element=list[i];
			outObj[element]=element;
	}
	return outObj;
}
module.exports = {


	//NOTE: maps property are "sourceFileFieldName":"targetJsonPropertyName". Empty map, {}, emits entire fieldlist.
	//ALSO: translations are executed *after* maps are set. Their format is: "targetJsonPropertyName": function
	//Translations are 1) the only way to use a source field twice, and
	//2) the only way to *create* a field that does not map to a source field
	//return '<!omitProperty!>'; will remove the property entirely

	//[doc1] - MN SIS Extract Files - Unified_V9(In Progress)
	//[doc2] - Plans4.x Import File Formats
	//[doc3] - DWextractLayout




	"teacher": //[doc1-User Base File]
	{
		"schemaName": "UserBase",
		"fieldList":teacherUffFieldList,
		"maps": {
			"expressbook": passThroughDefinition(teacherUffFieldList)
		},

		"translation": {
			"expressbook": {
				"Active": function(itemObj, sourceItem) {
					if (sourceItem.Status === 'A') {
						return 1;
					} else {
						return 0;
					}
				},

				"LDAP": function(itemObj, sourceItem) {
					return 0;
				},

				"UserName": function(itemObj, sourceItem) {
					if (sourceItem["Login Name"]) {
						return sourceItem["Login Name"];
					} else {
						return sourceItem["EmployeeID"];
					}
				},

				"Password": function(itemObj, sourceItem) {
					if (sourceItem["Login Name"]) {
						return sourceItem["Password"];
					} else {
						return 'test';
					}
				}
			}
		}
	},

	"homeroom": //[doc1-Section File]
	{
		"schemaName": "Section",
		"fieldList":homeroomUffFieldList,
		"maps": {
			"expressbook": passThroughDefinition(homeroomUffFieldList)
		},

		"translation": {
			"expressbook": {
				"RosmatType": function(itemObj, sourceItem) {
					if (sourceItem.HomeroomFlag === 'Y') {
						return 'Homeroom';
					} else {
						return 'Adhawk';
					}
				},

				"Title": function(itemObj, sourceItem) {
					if (sourceItem.HomeroomFlag === 'Y') {
						var prefix = 'HR:';
					} else {
						var prefix = '';
					}
					return prefix + sourceItem.SchoolCode + ':' + sourceItem.Grade + ':' + sourceItem.SectionNumber;
				},

				"LocalId": function(itemObj, sourceItem) {
					return sourceItem.SectionNumber;
				},

				"AbbrevTitle": function(itemObj, sourceItem) {
					if (sourceItem.HomeroomFlag === 'Y') {
						var prefix = 'HR:';
					} else {
						var prefix = '';
					}
					return prefix + sourceItem.SchoolCode;
				},

				"JsonStorage": function(itemObj, sourceItem) {
					return "{}";
				},

				"MarkingRule": function(itemObj, sourceItem) {
					return 1;
				}
			}
		}
	},

	"assignStudent": //[doc1-Student Enrollment File]
	{
		"schemaName": "SectionStudent",
		"fieldList":assignStudentUffFieldList,
		"maps": {
			"expressbook": passThroughDefinition(assignStudentUffFieldList)
		}
	},

	"assignTeacher": //[doc1-Section Staff File ]
	{
		"schemaName": "SectionStaff",
		"fieldList":assignTeacherUffFieldList,
		"maps": {
			"expressbook": passThroughDefinition(assignTeacherUffFieldList)
		}
	},



	"student": //define student, standalone. from: [doc1-Student Base File]
	{
		"schemaName": "StudentBase",
		"fieldList":studentUffFieldList,
		"maps": {
			"expressbook": passThroughDefinition(studentUffFieldList)
		},
		"translation": {
			"expressbook": {
			}
		}
	},


	"term": //define term, attach to school, from: [doc3-Term File]
	{
		"schemaName": "??",
		"fieldList": termFieldList,
		"maps": {
			"expressbook": passThroughDefinition(termFieldList)
		},
		"translation": {
			"expressbook": {
				"SequenceNum": function(itemObj, sourceItem) {
					var millisecondsPerDay = 86400000,
						offset = Date.parse("1/1/2014") / millisecondsPerDay,
						start = Date.parse(sourceItem["StartDate"]) / millisecondsPerDay,
						daysSinceOffset = start - offset
					return Math.round(daysSinceOffset);
				},

				"LocalId": function(itemObj, sourceItem) {
					if (typeof (sourceItem["Term Number"]) !== 'undefined') {
						return sourceItem["Term Number"];
					} else {
						return '<!omitProperty!>';
					}
				}
			}
		}
	},

	"gradeLevel": //define gradeLevel, attach to school, from: [doc3-Grade]
	{
		"schemaName": "grades",
		"fieldList":gradeLevelUffFieldList,
		"maps": {
			"expressbook": passThroughDefinition(gradeLevelUffFieldList)
		},
		"translation": {
			"expressbook": {
				"LocalId": function(itemObj, sourceItem) {
					return sourceItem["Grade"];
				},
				"SequenceNum": syntheticSequenceNumber
			}
		}
	},

	"school": //define school, standalone, from: [doc3-School File]
	{
		"schemaName": "from Plans4.x Import File Formats",
		"fieldList": schoolFieldList,
		"maps": {
			"expressbook": passThroughDefinition(schoolFieldList)
		},
		"translation": {}
	},

	"schoolSetCurrentTerm": //sets currentTerm field in school, no UFF analog
	{
		"schemaName": "SchoolInfo",
		"fileDataFormat": 'simpleEntityWithFieldHeader',
		"fieldList": schoolFieldList,
		"maps": {
			"expressbook": passThroughDefinition(schoolFieldList)
		}
	}
};

/*
//====================================
	"StudentEnrollment": //unused
		{
			"fieldList":
				["DistrictCode", "DistrictType",
				"StudentUniqueIdentifier", "StateStudentNumber",
				"LocalStudentNumber", "SchoolCode", "SchoolYearBeg",
				"SchoolYearEnd", "GradeLevel", "EntryDate",
				"WithdrawalDate", "EntryTypeCode", "WithdrawalTypeCode",
				"StudentResidentDistrictCode",
				"StudentResidentDIstrictType",
				"StudentResidentSchoolCode", "StateAidCategory",
				"LastLocationofAttendance", "PercentEnrolled",
				"AttendanceDays", "MembershipDays",
				"PostSecondaryOption", "PSEOHighSchoolParticipationHrs", 
				"HomeBoundServiceIndicator",
				"SpecialEducationEvaluationStatus",
				"SpecialEdInstructionalSetting", "LEP", "LEPBeginDate",
				"Gifted&TalentedPartiicipation", "Gender",
				"EthnicityCode", "BirthDate", "HomePrimaryLanguage",
				"PrimaryDisability", "TransportationCategory",
				"EconomicIndicator", "MigrantIndicator",
				"StudentTitle1Indicator", "HomelessStudentFlag",
				"TransportingDistrictCode", "TransportingDistrictType",
				"WardofStateFlag", "IndependentStudyFlag",
				"SupplementalEducationServices",
				"SpecialEnrollmentCode", "PrimarySchoolFlag", "SpecEd Flag", 
				"504 Flag", "Track", "TeamCode", "Promotion Status", 
				"Program of Study", "Enrollment Status",
				"Filler", "Filler ", "Filler", "Filler", "Filler",
				"Filler", "AdvisorID/Name", "Filler", "ELLServiceLevel",
				"Hispanic-Latino", "American Indian Alaska Native",
				"Asian", "Black-African American", "Native Hawaiian-Pacific Islander", 
				"White", "First US School Entry Date", "New to Country Flag", 
				"Filler ", "Next Year School"],
			"maps":{
					"expressbook":{
						}
				}
		},


	"Demo": //note fieldList directive is "simpleEntityWithFieldHeader"
		{
			"fieldList":
				"simpleEntityWithFieldHeader",
			"maps":{
					"expressbook":{
						}
				}
		},


	"Course": //not right now
		{
			"fieldList":
				["DistrictCode", "DistrictType", "SchoolCode",
				"CourseNumber", "SchoolYearBeg", "SchoolYearEnd",
				"CourseDesc", "CourseAbbrev", "SubjectArea/Department",
				"Credit", "GradeMinimum", "GradeMaximum"],
			"maps":{
					"expressbook":{
						}
				}
		},


	"UserRole": //??
		{
			"fieldList":
				["DistrictCode", "Filler2", "StaffUniqueIdentifier",
				"SchoolYearBeg", "SchoolYearEnd", "System", "Role",
				"State School/PlantNumber"]
		}
*/
