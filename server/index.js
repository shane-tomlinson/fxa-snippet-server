/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const path = require('path');
const Handlebars = require('handlebars');
const handlebars = Handlebars.create();
handlebars.registerHelper('t', function (msg) {
  if (msg.fn) {
    return msg.fn(this);
  }

  return msg;
});

const TEMPLATES_PATH = path.join(__dirname, '..', 'templates');
const LAYOUT_PATH = path.join(__dirname, '..', 'templates', 'layouts');

const Hapi = require('hapi');

const server = new Hapi.Server();
server.views({
  engines: {
    html: handlebars
  },
  path: TEMPLATES_PATH,
  layoutPath: LAYOUT_PATH,
  layout: 'default'
});

server.connection({
  host: '127.0.0.1',
  port: 3333
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.view('spring-2015-ios', {
      title: 'Firefox is coming soon to iOS!',
      playStoreImage: 'play-store-image.png'
    });
  }
});

server.start(function () {
  console.log('Server running at: ', server.info.uri);
});
