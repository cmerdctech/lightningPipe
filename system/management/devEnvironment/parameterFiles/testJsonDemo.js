{
    "input": [  


{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/010/segments/Guardian?sendFlatSpecs=true","destination":"Guardians", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/010/segments/Schedule?sendFlatSpecs=true","destination":"Schedules", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/010/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/011/segments/Guardian?sendFlatSpecs=true","destination":"Guardians", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/011/segments/Schedule?sendFlatSpecs=true","destination":"Schedules", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/011/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/020/segments/Guardian?sendFlatSpecs=true","destination":"Guardians", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/020/segments/Schedule?sendFlatSpecs=true","destination":"Schedules", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/020/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/099/segments/Guardian?sendFlatSpecs=true","destination":"Guardians", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/099/segments/Schedule?sendFlatSpecs=true","destination":"Schedules", "path":"Data"},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Hawley/schools/099/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students", "path":"Data"}




],

    "transform": [],

    "output": {
        "type": "file",
        "context": {
            "parentPath": "/Users/tqwhite/testLinkpoint/testDataDest/zzStudentPlans/hawley2/",
            "header":true,
            "fileExtension":".txt",
            
            "databaseName":"zzStudentPlans",
			"authParmsFile":"qubuntuMysqlAuth.json"
        },
        
		 "control":{
			"overwriteReminderSelective":[{"tableName":"NewCourses"}, {"tableName":"Enrollments"}],
			"overwriteReminderDoNone":[],
			"overwrite":[]
		 }
    }
}
