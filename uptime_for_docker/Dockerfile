# CENTOS BASE IMAGE 6.8
#
# VERSION               0.0.1

FROM daocloud.io/library/centos:7.2.1511

MAINTAINER zhuima <zhuima314@gmail.com>

ENV LC_ALL C
ENV TZ "Asia/Shanghai"
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && rm -rf /etc/yum.repos.d/*

ADD ustc.repo /etc/yum.repos.d/CentOS-Base.repo
ADD ustc-epel.repo /etc/yum.repos.d/epel.repo
ADD mongodb-org-3.2.repo /etc/yum.repos.d/mongodb-org-3.2.repo


RUN rpm --import https://mirrors.ustc.edu.cn/epel/RPM-GPG-KEY-EPEL-7 \
    && rpm --import http://mirrors.ustc.edu.cn/centos/RPM-GPG-KEY-CentOS-7 \
    && rpm --rebuilddb \
    && yum install -y gcc gcc-c++ glibc-common  git make automake cmake patch  python-devel \
    && yum install npm initscripts -y \
    && yum install mongodb-org -y \
    && yum clean all 

ADD default.yml /root/default.yml
ADD dingding_alert.py /root/dingding_alert.py
ADD run.sh /run.sh

EXPOSE 8082
CMD /run.sh
