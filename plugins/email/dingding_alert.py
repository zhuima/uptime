#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: zhuima
# zhuima @ 2017-03-02 10:02:23
# Function:

import json
import sys

import datetime
import time
import requests

reload(sys)
sys.setdefaultencoding('utf-8')

uptime_name = sys.argv[1]
uptime_status = sys.argv[2]
uptime_url = sys.argv[3]
uptime_deatils = sys.argv[4]
uptime_site = sys.argv[5]


def send_msg(uptime_name, uptime_status, uptime_url, uptime_deatils,
             uptime_site):
    '''
    if you want use this script in another env, Please change the sys
    Maybe you only need sys.argv[1] and sys.argv[2]
    use replace funcation to split line
    '''
    uptime_sendtime = time.strftime("%Y-%m-%d %H:%M:%S",
                                    time.localtime(time.time()))

    url = '' # 钉钉机器人url
    headers = {'content-type': 'application/json'}
    payload = {
        "msgtype": "text",
        "text": {
            "content": "生产环境域名监控:{0} is {1}\n项目名称:{2} \n域名: {3}\n当前状态: {4}\n报警投递时间: {5}\n请登陆站点查看: {6}\n".format(uptime_name, uptime_status, uptime_name, uptime_url, uptime_deatils, uptime_sendtime, uptime_site)
        },
        "at": {
            "atMobiles": [
            ],
            "isAtAll": True
        }
    }
    ret = requests.post(url, data=json.dumps(payload), headers=headers)


if __name__ == '__main__':
    send_msg(uptime_name, uptime_status, uptime_url, uptime_deatils,
             uptime_site)
