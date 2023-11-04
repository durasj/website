---
title: Octosign
description: Simple, user-friendly desktop electronic signature software utilizing government-issued eID and capable of PAdES, CAdES, and XAdES signatures.
type: open-source
position: 3
period: 2020-2022
skills:
  - react
  - electron
  - eidas
  - cryptography
  - jest
  - cypress
  - aws
positions:
  - period: 2020
    title: Authored and Open-Sourced
links:
  - name: Website
    link: https://octosign.com/
  - name: GitHub
    link: https://github.com/octosign/desktop
---

## Description

Under the eIDAS, many EU countries provide their citizens with means to create cryptographically strong signatures with a legal effect of handwritten signatures.
However, there was no desktop (offline) open source and user-friendly software that would allow utilizing them freely to sign any document.

That motivated me to create an open source desktop application capable of signing documents (PDF, JPG...) using image or cryptography (PAdES, CAdES, XAdES).
The desktop (Electron) application performs the signing locally and uses a simple proxy (AWS Lambda) for trust information.

The application was warmly welcomed by the local community trying to improve IT services offered by the Slovak government.
It also served as a starting point - with a free consulting from my side - for [Autogram](https://github.com/slovensko-digital/autogram) created specifically for use in Slovakia.
