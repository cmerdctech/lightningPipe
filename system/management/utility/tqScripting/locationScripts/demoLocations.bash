export homeDir="/home/lightningpipe"
export linkDir="/home/lightningpipe/testLinkpoint"
export lightningPipeBase="/home/lightningpipe/lpDemo/"

echo "Locations initialized: $homeDir"

#cloverleaf and lightningpath aliases and stuff
if [ -f /home/lightningpipe/lpDemo/system/management/utility/tqScripting/bash_alias_cloverleaf ]; then
source /home/lightningpipe/lpDemo/system/management/utility/tqScripting/bash_alias_cloverleaf
fi