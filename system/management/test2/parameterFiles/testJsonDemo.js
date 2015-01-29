{
    "input": [    
    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Address_Contact?sendFlatSpecs=true","destination":"Address_Contact", "path":"Data.Address_Contact", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Course?sendFlatSpecs=true","destination":"Course", "path":"Data.Course", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section_Staff?sendFlatSpecs=true","destination":"Section_Staff", "path":"Data.Section_Staff", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section_Student?sendFlatSpecs=true","destination":"Section_Student", "path":"Data.Section_Student", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section?sendFlatSpecs=true","destination":"Section", "path":"Data.Section", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Student_Base?sendFlatSpecs=true","destination":"Student_Base", "path":"Data.Student_Base", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Student_Enrollment?sendFlatSpecs=true","destination":"Student_Enrollment", "path":"Data.Student_Enrollment", "switches":{"header":false, "append":true}}
],

    "transform": [
    {
        
        "type":"sqlizer2",
		"parameters":{
		"input":[
			{"name":"Address_Contact"},
			{"name":"Course"},
			{"name":"Section_Staff"},
			{"name":"Section_Student"},
			{"name":"Section"},
			{"name":"Student_Base"},
			{"name":"Student_Enrollment"}
		],
		"process":[
			{"query":"create table NewCourses as select  c.courseAbbreviation || '_' || ss.lastName as fullName, c.courseAbbreviation as shortName, c.courseNumber || '_' || ss.staffUniqueIdentifier as idNumber, c.courseDesc as summary, '' as template, c.schoolCode as categoryPath, c.schoolCode as categoryId, c.schoolCode as categoryName, c.schoolCode as categoryDescription    from Course as c left join Section as s on s.courseNumber=c.courseNumber left join Section_Staff as ss on ss.sectionNumber=s.sectionNumber"},
			{"query":"create table Enrollments as select  c.courseNumber || '_' || ss.staffUniqueIdentifier as idNumber, ss.staffUniqueIdentifier as userId, 'editingTeacher' as role, s.sectionNumber || '_' || s.beginningPeriodNumber as 'group'   from Course as c left join Section_Staff as ss on ss.courseNumber=c.courseNumber left join Section as s on s.sectionNumber=ss.sectionNumber"},
			{"query":"create table Guardian as select 'Guardian' as tableName, * from Address_Contact"}
		],
		"export":[
			{"tableName":"NewCourses", "as":"NewCourses.txt"},
			{"tableName":"Enrollments", "as":"Enrollments.txt"},
			{"tableName":"Guardian", "as":"Guardian.txt"}
		]
		}

    
    }
    ],

    "output": {
        "type": "file",
        "context": {
            "parentPath": "/Users/tqwhite/testLinkpoint/testDataDest/AlbanyJsonTest/"
        },
        "control": {
            "append": "false",
            "header": "true"
        }
    }
}
