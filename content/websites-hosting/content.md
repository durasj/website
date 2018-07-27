---
title: Websites and hosting
type: noncommercial
description: Experience hosting, tweaking websites on Linux servers.
size: is-one-third
color: green
period: '2011-2018'
skills: [linux, server, administration, ansible, wordpress, nginx, php, security, node, koa, vuejs, influxdb]
---

Setting up and managing different websites running mostly on the WordPress. All of them hosted on Linux servers in the cloud. In the beginning, hosting control panels like ISPConfig or VestaCP were used to manage the websites. Those were later replaced with Ansible that automates management of more than dozen of sites on several servers.

### Management UI

For easy access to all information and control from everywhere, there is a custom-made management UI that is mostly abstraction around ansible. There is also simple monitoring triggered by a cronjob with data saved in the time series database (InfluxDB).