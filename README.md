# Source for calebburton.com

![CI](https://github.com/CalebBurton/website-source/workflows/CI/badge.svg?branch=main)

Source code for my personal website

Git submodules reference: <https://www.vogella.com/tutorials/GitSubmodules/article.html#submodules_adding>

## Handlebars

- <https://cloudfour.com/thinks/the-hidden-power-of-handlebars-partials/>
- <https://handlebarsjs.com/partials.html>
- <https://github.com/sagold/handlebars-webpack-plugin>

In `.zshrc`:

```bash
alias website-go='cd ~/Documents/GitHub/website-source && npm run build:dev'
alias website-publish='cd ~/Documents/GitHub/website-source && npm run publish'
```

<!--
sudo -u deployemon bash

eval $(ssh-agent -s) && ssh-add ~/.ssh/id_github
-->
