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

'use strict';

function avideo() {

    const self = this;
    // should react on avideo::
    self.named('avideo');
    self.process(function (parent, target, attrs) {
        // rewrite the youtube code as image (  get from  https://i1.ytimg.com/vi/<videocode>/hq1.jpg )
        // place all the placeholder in placeholder file
        let imagetarget = 'placeholder/' + target + '.jpg';
        // get and id
        let idofvideoplaceholder = target + 'placeholder';

        const nodes = [];
        // add title block if title is present
        if (attrs.title) {
            nodes.push(self.createBlock(parent, 'pass', `<div class="title" >` + attrs.title + `</div>`));
        }
        // create div wrapper with id of video for the script to get the correct video
        nodes.push(self.createBlock(parent, 'pass', `<div class="videoconsentblock" id="${idofvideoplaceholder}">`));
        // get image should be local
        // using block will trigger issue on image target not found
        // open referenced video on youtube in separate tab/window
        nodes.push(self.createBlock(parent, 'image', "", {
            'target': imagetarget,
            'alt': 'placeholder for video ' + target,
            'link': 'https://www.youtube.com/watch?v=' + target,
            'window': '_blank'
        }));
        nodes.push(self.createBlock(parent, 'pass', `</div>`));
        nodes.push(self.createBlock(parent, 'paragraph', 'Clicking on the image above will open a new window/tab with the video on YouTube'));
        parent.blocks.push(...nodes);
    });
}


module.exports.register = function register(registry) {
    if (typeof registry.register === 'function') {
        registry.register(function () {
            this.blockMacro(avideo);
        });
    } else if (typeof registry.block === 'function') {
        registry.blockMacro(avideo);
    }
    return registry;
};
