# VMware Carbon Black Cloud Cockpit Plugin

This project is used to create a plugin to cockpit to check the status and logs of a Carbon Black sensor installed on a Linux endpoint running cokpit.

Cockpit project is an open source project from RedHat, that is available on almost all Linux distros.
1. [Cockpit project](https://cockpit-project.org/)
1. [Cockpit installation](https://cockpit-project.org/running.html)

## Get cbc-cockpit-plugin on your Linux endpoint
### Prerequisites

* Install Cockpit
* Use user root, or a user with sudo privileges to run cbc-cockpit-plugin

### Download plugin

mkdir cbc-cockpit-plugin; cd cbc-cockpit-plugin

curl -O https://raw.githubusercontent.com/slist/cbc-cockpit-plugin/main/manifest.json

curl -O https://raw.githubusercontent.com/slist/cbc-cockpit-plugin/main/cbc.html

curl -O https://raw.githubusercontent.com/slist/cbc-cockpit-plugin/main/cbc.js

curl -O https://raw.githubusercontent.com/slist/cbc-cockpit-plugin/main/cbc.png

### Integrate plugin to Cockpit for current user

mkdir -p ~/.local/share/cockpit

ln -snf $PWD ~/.local/share/cockpit/cbc-cockpit-plugin

### Check integration

cockpit-bridge --packages

### Login on Cockpit https://127.0.0.1:9090

Use the login used to download the plugin, enjoy cbc plugin!
