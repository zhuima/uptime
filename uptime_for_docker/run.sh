#!/bin/bash

set -ex

cd /root && git clone https://github.com/zhuima/uptime.git && cd uptime && npm install --registry=https://registry.npm.taobao.org
/etc/init.d/mongod restart
echo 'db.createUser({user: "admin", pwd: "uptime", roles: [ { role: "readWrite", db: "uptime" }]})' | mongo localhost:27017/uptime
cp /root/default.yml /root/uptime/config/default.yml
cp /root/dingding_alert.py /root/uptime/plugins/email/dingding_alert.py
cd /root/uptime && NODE_ENV=production node app
