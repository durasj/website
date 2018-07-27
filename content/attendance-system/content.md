---
title: Attendance System
description: Helps hundreds of workers get paid few millions euro a year.
color: red
period: 2014-2017
skills: [php, sql, linux, administration, rest, api, git, automatic deployment, js, vuejs, cordova, jquery, gulp]
---

### Problem

The company was using mostly spreadsheets for all management. Over the time, as the company expanded (mainly to other countries), there was a need for a better way to manage employees and contractors. None of the available products were suitable for the company, so a tailor-made app was created.

### Solution

Started as simple attendance system. Now *used on a daily basis by few hundred users* writing down tens of thousands of hours, expenses and using more than 18 other functions. Developed for the company located in the Czech Republic which is part of the top 10% of the largest companies in the country.

Consists of three main parts:
  - Web Application
  - Payment System
  - Mobile Application

#### Web Application

PHP application without any full-fledged framework with some libraries used, e.g. for templates, ORM. Git (git-flow) and automated deployment used to achieve multiple environments. One of the challenges was to optimize the SQL schema and queries for scale.

#### Payment System

Customized locked-down version of Debian GNU/Linux used to pay partners.

#### Mobile Application

Authorization via NFC ID cards, communication with a server via REST API.