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

function avideo() {

    const self = this
    // should react on avideo::
    self.named('avideo')
    self.process(function (parent, target, attrs) {
        // rewrite the youtube code as image (  get from  https://i1.ytimg.com/vi/<videocode>/hq1.jpg )
        let imagetarget = './' + target + '.jpg'
        // get and id
        let idofvideoplaceholder = target + 'placeholder';

        // prepare attribute list for image
        let attribute = {'target': imagetarget, 'alt': 'placeholder for video ' + target}
        // script to play on click
        let script = `<script>
        function loadScript() {
            return new Promise((resolve, reject) => {
                let script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                script.addEventListener('load', resolve);
                script.addEventListener('error', (e) => reject(e));
                document.body.appendChild(script);
            });
        }

        function addElement() {
            loadScript().then(() => {
                window.YT.ready(function() {
                    let player = new YT.Player('${idofvideoplaceholder}', {
                    height: '490',
                    width: '968',
                    videoId: '${target}',
                    playerVars: {
                        'playsinline': 1
                    },
                    events: {
                        'onReady': (event) => {
                            event.target.playVideo();
                        }
                    }
                    });
                });
            });
        }

        var container = document.querySelector('#${idofvideoplaceholder} .content');
        container.addEventListener('click', addElement);
    </script>`

        const nodes = []
        // create div wrapper with id of video for the script to get the correct video
        nodes.push(self.createBlock(parent, 'pass', `<div class="videoconsentblock" id="${idofvideoplaceholder}">`))
        // get image should be local
        // using block will trigger issue on image target not found
        nodes.push(self.createBlock(parent, 'image', "", attribute))
        nodes.push(self.createBlock(parent, 'pass', `</div>`))
        // Apache privacy
        nodes.push(self.createBlock(parent, 'paragraph', 'Clicking on the image above will load the video and send data from and to Googl'))
        nodes.push(self.createBlock(parent, 'pass', script))
        parent.blocks.push(...nodes)
    })
}


module.exports.register = function register(registry) {
    if (typeof registry.register === 'function') {
        registry.register(function () {
            this.blockMacro(avideo)
        })
    } else if (typeof registry.block === 'function') {
        registry.blockMacro(avideo)
    }
    return registry
}
