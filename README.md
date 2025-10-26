# Apache NetBeans website with antora

Apache NetBeans website with antora playbook

## Infrastructure for Apache NetBeans website with antora

### Basic structure
Several repository are used as content for the website:

- [netbeans-antora-site](https://github.com/apache/netbeans-antora-site) contains blogs and community pages
- [netbeans-antora-wiki](https://github.com/apache/netbeans-antora-wiki) contains wiki pages
- [netbeans-antora-tutorials](https://github.com/apache/netbeans-antora-tutorials) contains tutorials and kownledge database
- [netbeans-antora-ui](https://github.com/apache/netbeans-antora-ui) handle the UI, template and css

### Tools

- [Node.js](https://nodejs.org/en/download)
- [Git](https://git-scm.com/downloads)

### Extensions

- 'lib/rssfeed.js' to generate atom file for rss
- '@antora/lunr-extension' for indexing and search

### Building localy

```
# replace username with your own github repository username if you want to use your own clones
username=apache
mkdir antora
cd antora
git clone https://github.com/$username/netbeans-antora.git
git clone https://github.com/$username/netbeans-antora-site.git
git clone https://github.com/$username/netbeans-antora-wiki.git
git clone https://github.com/$username/netbeans-antora-tutorials.git
git clone https://github.com/$username/netbeans-antora-ui.git
# Build the netbeans-antora-ui project first
cd netbeans-antora-ui
npm install
npm run gulp bundle
# Install required extension and launch local build
cd netbeans-antora
npm install
npx antora antora-local-playbook.yml
# Launch local webserver the provided file:// url from antora build does not work
# nicely with directory links, that expect the index.html to open
npx http-server build/site
```

## Apache guidelines for web sites

Apache provides different guidelines for project websites. Here are some:

Project-related non-apache.org domain names::
https://www.apache.org/foundation/marks/pmcs#nonapache

Apache Website Navigation Links Policy::
https://www.apache.org/foundation/marks/pmcs#navigation

Using `svnpubsub` or `CMS` for web site publishing, and using branches::
https://www.apache.org/dev/project-site.html#generated

Using `.htaccess` to configure the web server::
https://www.apache.org/dev/project-site.html#configure

How to manage my project's webpage::
https://www.apache.org/dev/project-site.html#intro