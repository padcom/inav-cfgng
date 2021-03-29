const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  send: (channel, ...data) => {
    ipcRenderer.send(channel, ...data);
  },
  once: (channel, func) => {
    ipcRenderer.once(channel, func);
  },
  on: (channel, func) => {
    ipcRenderer.on(channel, func);
  },
  off: (channel, func) => {
    ipcRenderer.removeListener(channel, func);
  }
})
