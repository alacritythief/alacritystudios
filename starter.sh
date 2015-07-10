#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
        export PATH=/usr/local/bin:$PATH
        forever start --sourceDir /home/alacritythief/alacritystudios server.js >> /home/alacritythief/alacritystudios/server.log 2>&1
fi
