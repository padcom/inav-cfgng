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
  },
  query: (channel, ...data) => new Promise(resolve => {
    ipcRenderer.once(channel, (sennder, ...data) => { resolve(...data) })
    ipcRenderer.send(channel, ...data)
  })
})
