#!/bin/bash


# url.txt内容格式如下
# baidu.com 80 http://www.baidu.com


while read line;do 
    curl -u admin:password -i -H "Accept: application/json" -X PUT -d "name=$(echo $line | awk '{print $1}')" -d "url=$(echo $line | awk '{print $3}')" -d "alertTreshold=2" http://ip:8082/api/checks/;
done</root/url.txt
