# Source for calebburton.com

<!-- [![CI](https://img.shields.io/github/workflow/status/calebburton/website-source/CI?logo=github&style=plastic)](https://github.com/CalebBurton/website-source/actions?query=workflow%3ACI) -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/3d150968-bc75-4e7e-bc26-b845266b7004/deploy-status)](https://app.netlify.com/sites/competent-benz-edf1cf/deploys)

[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&style=plastic)](https://github.com/prettier/prettier)

Source code for my personal website, built with Eleventy.

> **Migration in progress:** the site is being finished and hardened on the `eleventy-rewrite` branch. See [`MIGRATION-PLAN.md`](./MIGRATION-PLAN.md) for the in-flight plan.

## Development

### Prerequisites
- Node.js 24+ (specified in `.nvmrc`)
- npm 8+

### Commands
- `npm run dev` - Start development server with live reload
- `npm run build` - Build for production
- `npm run clean` - Remove build directory
- `npm run format` - Format code with Prettier
- `npm run lint:check` - Check code formatting
- `npm run publish` - Build and rsync `_site/` to the deploy target

### Project Structure
- `eleventy.config.js` - Eleventy configuration
- `src/_includes/layouts/` - Page layouts
- `src/_includes/components/` - Reusable Nunjucks components
- `src/_data/` - JSON data files (auto-loaded by Eleventy)
- `src/pages/` - Page templates (including `dummy.njk`, which may be removed in a later phase)
- `src/assets/` - Static assets (scripts, styles, images)
- `static/` - Static files copied through as-is (favicon, wordle)

### Build Output
- Generated site is built to `_site/` directory
- Build time: ~0.1s (hundreds of times faster than the previous Gatsby setup)

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
