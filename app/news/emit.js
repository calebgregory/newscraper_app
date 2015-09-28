'use strict';

export function gimme(io, data) {

  setTimeout(() => {
    io.sockets.emit('news', data.result);
  }, 250);

}
