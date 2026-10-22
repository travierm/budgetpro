# BudgetPro

Hosted at https://budgetpro.tecdrip.com. Budget data stays in browser local storage.

## Development

Use Node **24.22.1** (security-patched LTS) and npm **12.2.1**. The version files,
package engines, lockfile, CI and Docker build use this toolchain. Bun is no longer required.

```sh
nvm install
nvm use
npm install --global npm@12.2.1
npm ci
npm run dev
```

```sh
npm run audit
npm run build
npm test
npm start
```

Build before testing or starting the production server. It listens on `0.0.0.0:3000`
(`PORT` can override this locally), serves `dist`, and supports Vue history routes.
`GET /up` returns readiness; missing assets return 404. Tailwind 4 requires modern
browsers: Safari 16.4+, Chrome 111+, Firefox 128+.

## Security checks

On 2026-10-21, the baseline npm resolution of the previous manifest had 9 affected
packages (6 high, 3 moderate). After updates, npm audit reports zero findings.
The production amd64 Alpine image also has zero Trivy findings across OS and
installed application packages using the advisory database retrieved on 2026-10-22 UTC.
These are known-advisory checks, not a guarantee that every vulnerability is detectable.

CI runs the build, HTTP integration tests, npm audit, Ruby dependency audit,
Kamal configuration validation and a production container CVE scan on pushes,
pull requests and weekly. Every reported npm or container vulnerability fails its check;
no advisory suppressions are configured. Dependabot checks npm, Docker, Ruby and
GitHub Actions weekly. Review and merge updates, including runtime version pins,
and rebuild/redeploy to deliver fixes to production.

The runtime image contains Node, production dependencies and built assets, runs
as `node`, and omits npm, Yarn and build tools. `.dockerignore` excludes deployment
credentials, environment files, Git metadata and local dependencies.

```sh
docker build --pull --platform linux/amd64 -t budgetpro:security-check .
docker run --rm -p 127.0.0.1:3000:3000 budgetpro:security-check
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy:0.76.1 image --scanners vuln --exit-code 1 budgetpro:security-check
```

## Deploy with Kamal

Install Ruby 4.0 and Bundler, then install the locked Kamal **2.12.0** toolchain:

```sh
bundle install
bundle exec bundler-audit check --update
```

`config/deploy.yml` targets `tecdrip.com`, publishes `moorlagt/budgetpro`, and
routes HTTPS for `budgetpro.tecdrip.com` to port 3000. Both Docker and Kamal check
`/up`. Kamal bridges fingerprinted assets at `/app/dist/assets` across releases.
No server-side data volume is needed.

Before deploying, set `KAMAL_REGISTRY_PASSWORD` in your shell to a Docker Hub
access token for `moorlagt`; `.kamal/secrets` reads it from the environment.
Do not commit tokens. Confirm SSH access as `root`, verify the server host key
through a trusted channel, and ensure DNS points to the server with ports 80/443
available to Kamal Proxy. Never disable SSH host-key verification to bypass an error.

```sh
bundle exec kamal config > /dev/null
bundle exec kamal deploy
```

For a new server, use `bundle exec kamal setup` for the first deployment.
Kamal deploys committed source by default, so commit the reviewed changes first.

Local validation covered the amd64 image build, non-root startup, Docker health
status, HTTP routes/assets, desktop/mobile browser smoke checks and Kamal config
parsing. No deployment was performed. The remote preflight stopped with
`Host key verification failed`; registry authentication, server OS patches,
Docker/Kamal Proxy versions and production TLS still need verification on the host.
