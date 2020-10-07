# Source for calebburton.com

[![CI](https://github.com/CalebBurton/website-source/workflows/CI/badge.svg?branch=main)](https://github.com/CalebBurton/website-source/actions?query=workflow%3ACI)

Source code for my personal website

## Eleventy

- <https://www.11ty.dev/>
- <https://github.com/11ty/11ty-website>

In `.zshrc`:

```bash
alias website-go='cd ~/Documents/GitHub/website-source && npm run build:dev'
alias website-publish='cd ~/Documents/GitHub/website-source && npm run publish'
```

<!--
sudo -u deployemon bash
cd ~/website-source
eval $(ssh-agent -s) && ssh-add ~/.ssh/id_github
git pull
npm run publish

vi /etc/apache2/apache2.conf
-->
