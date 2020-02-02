import socketio from 'socket.io-client';

const socket = socketio("http://http://192.168.0.5:8888", {
  autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {  // Enviando ao servidor os dados para ver se é necessário atualizar na hora
    latitude,
    longitude,
    techs,
  };

  socket.connect();

}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevs,
}