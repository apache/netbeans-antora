/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

module.exports.register = function ( { config }) {
  this.on('beforePublish', ({ siteCatalog, contentCatalog, playbook}) => {
    // filter page to have blogentry
    const pages = contentCatalog.getPages(({ asciidoc, out }) => {
      if (! out || ! asciidoc)
        return
      const pageTags = asciidoc.attributes['page-tags']
      const rvalue = pageTags && pageTags.split(', ').includes('blogentry')
      return rvalue
    })
    const { buildPageUiModel } = require.main.require('@antora/page-composer/build-ui-model')
    // put every information on page
    const blogpages = pages.map((page) => buildPageUiModel(siteCatalog, page, contentCatalog)).sort(sortByDate)
    // bulild xml as string
    var feed = '<?xml version="1.0" encoding="UTF-8"?>'
    feed += '\n<feed xmlns="http://www.w3.org/2005/Atom">'
    feed += '\n  <title type="html">Apache NetBeans</title>'
    feed += '\n  <subtitle type="html">Quickly and easily develop web, mobile and desktop applications with Java, JavaScript, HTML5, PHP, C/C++ and more. </subtitle>'
    feed += '\n  <icon>https://netbeans.apache.org/favicon-32x32.png</icon>'
    feed += '\n  <id>https://netbeans.apache.org/blogs/atom</id>'
    feed += '\n  <link rel="self" type="application/atom+xml" href="https://netbeans.apache.org/front/main/blogs/atom" />'
    feed += '\n  <link rel="alternate" type="text/html" href="https://netbeans.apache.org/blogs/atom" />'
    blogpages.forEach((p) => {
      feed += '\n  <entry>'
      feed += '\n    <id>' + playbook.site.url + p.url + '</id>'
      feed += '\n    <title type="html">' + escape(p.title.toString()) + '</title>'
      feed += '\n    <author><name>' + p.author + '</name></author>'
      feed += '\n    <link rel="alternate" type="text/html" href="' + playbook.site.url + p.url + '"/>'
      feed += '\n    <published>' + rssDate(p.attributes.revdate) + '</published>'
      feed += '\n    <updated>' + rssDate(p.attributes.revdate) + '</updated>'
      feed += '\n    <content type="html">'
      feed += '\n'+ escape(blogcontent(p.contents.toString()))
      feed += '\n    </content>'
      feed += '\n  </entry>'
    })
    feed += '\n</feed>'
    // transfer to file in folder hierarchy
    const contents = Buffer.from(feed)
    siteCatalog.addFile({ contents, out: { path: 'front/main/blogs/atom' } })
  })
}

// get a rss date from date
function rssDate (d) {
  const date = new Date(d)
  const month = date.getMonth() + 1
  const monthd = (month < 10 ? '0' : '') + month
  const dayinmonth = (date.getDate() < 10 ? '0' : '') + date.getDate()
  //we need this kind of format 2023-09-01T00:00:00Z
  return date.getFullYear() + '-' + monthd + '-' + dayinmonth + 'T00:00:00Z'
}

// sorter by date
function sortByDate (a, b) {
  return new Date(b.attributes.revdate) - new Date(a.attributes.revdate)
}
// reduce the page content to approx content, 
function blogcontent (s) {
  // end of content
  const endofsection  = s.indexOf('<section class="tools">')
  const endofarticle = s.indexOf("</article>")
  // possible starting point of article,
  const startofparagraph = s.indexOf('<div class="paragraph">')
  const startofpreamble = s.indexOf('<div id="preamble">')
  // take min if defined
  const startpoint = Math.min( startofparagraph>-1 ? startofparagraph : Infinity, startofpreamble >-1 ? startofpreamble: Infinity)
  const endpoint = Math.min( endofsection>-1 ? endofsection : Infinity, endofarticle >-1 ? endofarticle: Infinity)
  const split = s.substring( startpoint, endpoint)
  return split
}
// remove some breaking char for xml 
function escape (s) {
  s = s.replaceAll('&', '&amp;')
  s = s.replaceAll('>', '&gt;')
  s = s.replaceAll('<', '&lt;')
  s = s.replaceAll('"', '&quot;')
  s = s.replaceAll("'", '&apos;')
  return s
}
