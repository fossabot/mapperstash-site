#!/bin/bash
# Do not use this script outside of config/

# Gets the path of the script
SCRIPTPATH="$( dirname $( readlink -f "${BASH_SOURCE[0]}" ) )"

# Creates CSS in public from SCSS in resources
sass $SCRIPTPATH/../resources/scss/main.scss $SCRIPTPATH/../public/content/main.css --style=compressed --no-source-map
