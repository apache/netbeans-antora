# Apache NetBeans antora web site building infrastructure

Apache NetBeans antora playbook

## Infrastructure for Apache NetBeans website with antora

### Basic structure
Several repository are used as content for the website

- https://github.com/apache/netbeans-antora-site contains blogs and community pages
- https://github.com/apache/netbeans-antora-wiki contains wiki pages
- https://github.com/apache/netbeans-antora-tutorials contains tutorials ad kownledge database

Another repository handle the UI, template and css for the website

https://github.com/apache/netbeans-antora-ui

### Tools

You will need a LTS Node Js 

### Extensions

- lib/rssfeed.js custom extension to generate atom file for rss
- '@antora/lunr-extension' antora extension for indexing and search

### Building localy

mkdir antora;cd antora
git clone https://github.com/<yourfork>/netbeans-antora
git clone https://github.com/<yourfork>/netbeans-antora-site
git clone https://github.com/<yourfork>/netbeans-antora-wiki
git clone https://github.com/<yourfork>/netbeans-antora-tutorials
git clone https://github.com/<yourfork>/netbeans-antora-ui

cd netbeans-antora

npx antora antora-local-playbook.yml


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