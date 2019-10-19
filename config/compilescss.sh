#!/bin/bash

DIR="$( dirname $( readlink -f "${BASH_SOURCE[0]}" ) )" #This gets the directory the script is being run in

sass $DIR/../resources/scss/main.scss $DIR/../public/content/main.css
