const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, ...data) => {
    ipcRenderer.send(channel, ...data);
  },
  on: (channel, func) => {
    console.log('Adding', channel, 'listener')
    ipcRenderer.on(channel, func);
  },
  off: (channel, func) => {
    console.log('removing', channel, 'listener', ipcRenderer.removeListener)
    ipcRenderer.removeListener(channel, func);
  }
})
