# ansible-manager-frontend

[![CircleCI](https://circleci.com/gh/JuKu/ansible-manager-frontend/tree/master.svg?style=svg)](https://circleci.com/gh/JuKu/ansible-manager-frontend/tree/master)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=ncloc)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=alert_status)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=coverage)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)
[![Technical Debt Rating](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=sqale_index)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=code_smells)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=bugs)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=vulnerabilities)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ansible-manager-frontend&metric=security_rating)](https://sonarcloud.io/dashboard/index/ansible-manager-frontend)

[![Sonarcloud](https://sonarcloud.io/api/project_badges/quality_gate?project=ansible-manager-frontend)](https://sonarcloud.io/dashboard?id=ansible-manager-frontend)


An angular frontend for the ansible manager: https://github.com/JuKu/ansible-manager

## Dev Tools

  - https://angular.io/guide/devtools

## Troubleshooting

  - Problems with SSL dependencies (hashing issues)
    - https://github.com/vercel/next.js/issues/30078
    - use environmental option: `NODE_OPTIONS=--openssl-legacy-provider`
