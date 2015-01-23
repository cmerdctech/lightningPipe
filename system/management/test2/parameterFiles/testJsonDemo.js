{
    "input": [
    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Address_Contact?sendFlatSpecs=true","destination":"Address_Contact", "path":"Address_Contact", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Course?sendFlatSpecs=true","destination":"Course", "path":"Course", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section_Staff?sendFlatSpecs=true","destination":"Section_Staff", "path":"Section_Staff", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section_Student?sendFlatSpecs=true","destination":"Section_Student", "path":"Section_Student", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section?sendFlatSpecs=true","destination":"Section", "path":"Section", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Student_Base?sendFlatSpecs=true","destination":"Student_Base", "path":"Student_Base", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Student_Enrollment?sendFlatSpecs=true","destination":"Student_Enrollment", "path":"Student_Enrollment", "switches":{"header":false, "append":true}}
],

    "transform": [
    {
        
        "type":"sqlizer2",
		"parameters":{
		"receive":[
			{"name":"Address_Contact"},
			{"name":"Course"},
			{"name":"Section_Staff"},
			{"name":"Section_Student"},
			{"name":"Section"},
			{"name":"Student_Base"},
			{"name":"Student_Enrollment"}
		],
		"operations":[
			{"query":"create table Student as select * from Student_Base"},
			{"query":"create table Schedule as select * from Section_Student"},
			{"query":"create table Guardian as select * from Address_Contact"}
		],
		"export":[
			{"tableName":"Student", "as":"Student.txt"},
			{"tableName":"Schedule", "as":"Schedule.txt"},
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
