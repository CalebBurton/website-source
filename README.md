# Source for calebburton.com

<!-- [![CI](https://img.shields.io/github/workflow/status/calebburton/website-source/CI?logo=github&style=plastic)](https://github.com/CalebBurton/website-source/actions?query=workflow%3ACI) -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/3d150968-bc75-4e7e-bc26-b845266b7004/deploy-status)](https://app.netlify.com/sites/competent-benz-edf1cf/deploys)

[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&style=plastic)](https://github.com/prettier/prettier)

Source code for my personal website

<!--
## Eleventy

-   <https://www.11ty.dev/>
-   <https://github.com/11ty/11ty-website>
-->

## Gatsby

Let's check out this React thing all the cool kids are talking about.

- <https://www.gatsbyjs.com/docs>

And now that we're confident in our Apache skills, let's deploy to Netlify and save a few bucks.

<!-- In `.zshrc`:

```bash
alias website-go='cd ~/Documents/GitHub/website-source && npm run build:dev'
alias website-publish='cd ~/Documents/GitHub/website-source && npm run publish'
```

Harden Apache ([reference docs](https://httpd.apache.org/docs/)):

- [x] <https://www.tecmint.com/hide-apache-web-server-version-information/>
- [x] <https://geekflare.com/apache-web-server-hardening-security/>
- [x] <https://infosec.mozilla.org/guidelines/web_security>
- [x] <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy>
- [x] <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy> -->

<!--
sudo -u deployemon bash
cd ~/website-source
eval $(ssh-agent -s) && ssh-add ~/.ssh/id_github
git pull
npm run publish

vi /etc/apache2/apache2.conf
sudo service apache2 restart

scp ~/Documents/GitHub/website-source/.env deployemon@do-site:/home/deployemon/website-source
-->

<!--
sudo a2enmod cgid
sudo a2enmod headers
sudo a2enmod http2
systemctl restart apache2

sudo service apache2 restart
-->

<!--
Everything is being redirected by /etc/apache2/mods-enabled/alias.conf

sudo tail /var/log/apache2/access.log
-->
