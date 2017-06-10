#!/bin/bash

n=0
status=$(nc -z hub 4444; echo $?)
until [ $n -ge 5 ]
do
  status=$(nc -z hub 4444; echo $?)
  n=$[$n+1]
  sleep 5
done

if [ $status == 0 ]; then
    exit 0
else
    exit 1
fi
