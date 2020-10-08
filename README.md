# Source for calebburton.com

[![CI](https://img.shields.io/github/workflow/status/calebburton/website-source/CI?logo=github&style=plastic)](https://github.com/CalebBurton/website-source/actions?query=workflow%3ACI)

[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&style=plastic)](https://github.com/prettier/prettier)

Source code for my personal website

## Eleventy

-   <https://www.11ty.dev/>
-   <https://github.com/11ty/11ty-website>

In `.zshrc`:

```bash
alias website-go='cd ~/Documents/GitHub/website-source && npm run build:dev'
alias website-publish='cd ~/Documents/GitHub/website-source && npm run publish'
```

Harden Apache:

- [x] <https://www.tecmint.com/hide-apache-web-server-version-information/>
- [ ] <https://geekflare.com/apache-web-server-hardening-security/>

<!--
sudo -u deployemon bash
cd ~/website-source
eval $(ssh-agent -s) && ssh-add ~/.ssh/id_github
git pull
npm run publish

vi /etc/apache2/apache2.conf
sudo service apache2 restart
-->
