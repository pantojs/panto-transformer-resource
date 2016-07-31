/**
  * Copyright (C) 2016 pantojs.xyz
  * index.js
  *
  * changelog
  * 2016-07-22[18:05:16]:revised
  *
  * @author yanni4night@gmail.com
  * @version 0.1.2
  * @since 0.1.0
  */

'use strict';
const sysurl = require('url');
const syspath = require('path');
const Transformer = require('panto-transformer');

const GLOBAL_PATTERN = [{
    pattern: `\\burl\\(\\s*(['"])?\\s*(\\S+?)\\s*\\1?\\s*\\)`,
    index: 2,
    whole: false
}, {
    pattern: `<link[^>]*?\\s+href\\s*=((['"])\\s*(\\S+?)\\s*\\2)`,
    index: 3,
    whole: false
}, {
    pattern: `<script[^>]*?\\s+src\\s*=((['"])\\s*(\\S+?)\\s*\\2)`,
    index: 3,
    whole: false
}, {
    pattern: `<img[^>]*?\\s+src\\s*=((['"])\\s*(\\S+?)\\s*\\2)`,
    index: 3,
    whole: false
}];

Object.freeze(GLOBAL_PATTERN);

class ResourceTransformer extends Transformer {
    _transform(file) {
        let {
            filename,
            content
        } = file;

        const {
            getResourceAlias
        } = this.options;

        const _stamp = function (url) {
            let resname, aliasName;

            //Do trim
            url = String.prototype.trim.call(url);

            var parsedUrl = sysurl.parse(url, true);

            //search is used instead of query when formatting
            delete parsedUrl.search;

            if (parsedUrl.protocol || /^(?:#|\/\/)/i.test(url)) {
                //we ignore illegal urls or urls with protocol
                //we see '//' as a dynamic protocol
                return url;
            }

            if (!/^\//.test(parsedUrl.pathname)) {
                resname = syspath.join(syspath.dirname(filename), parsedUrl.pathname);
            } else {
                //absolute url
                return url;
            }
            panto.reportDependencies(filename, resname);
            aliasName = getResourceAlias(resname, filename);

            if (!aliasName) {
                return url;
            }

            parsedUrl.pathname = aliasName;

            return sysurl.format(parsedUrl);

        };

        return new Promise(resolve => {

            for (let regex of GLOBAL_PATTERN) {
                const reg = new RegExp(regex.pattern, 'img');
                const index = regex.index;
                const whole = regex.whole;

                let matches, url, start, end;

                while ((matches = reg.exec(content))) {
                    url = matches[whole ? 0 : index];
                    start = matches.index + matches[0].indexOf(url);
                    end = start + url.length;
                    content = content.slice(0, start) + _stamp(matches[index]) + content.slice(end);
                }
            }

            resolve(panto._.extend(file, {
                content
            }));

        });
    }
}

module.exports = ResourceTransformer;
