#!/bin/bash

# $cloverleaf \
# http://127.0.0.1:8081/uff/1.0/districts/HawleyMinus/schools/011/segments/Guardian#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Guardians.txt -ah


# $cloverleaf \
# http://127.0.0.1:8081/uff/1.0/districts/HawleyMinus/schools/011/segments/Schedule#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Schedules.txt -ah

echo "clearing HawleyMinus/Students.txt";
rm $clTestDestDir/HawleyMinus/Students.txt;
echo "execute cloverleaf";
$cloverleaf \
http://127.0.0.1:8081/uff/1.0/districts/HawleyMinus/schools/011/segments/Student_Enrolled#Data?sendFlatSpecs=true \
$clTestDestDir/HawleyMinus/Students.txt -ah
echo '---';