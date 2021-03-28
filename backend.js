const path = require('path')
const { app, ipcMain, BrowserWindow } = require('electron')
const SerialPort = require('serialport')

const PORTS = {}

app.on('ready', async () => {
  const window = new BrowserWindow({
    webPreferences: {
      devTools: true,
      preload: path.join(app.getAppPath(), './', 'preload.js'),
    }
  })
  window.maximize()
  window.webContents.openDevTools()
  setTimeout(() => { window.loadURL('http://localhost:1234') }, 1000)
  
  ipcMain.on('port.open', (event, path) => {
    if (!PORTS[path]) {
      console.log('Opening port', path)
      PORTS[path] = new SerialPort(path)
      PORTS[path].on('open', () => {
        event.sender.send('port.open', path)
      })
      PORTS[path].on('close', () => {
        event.sender.send('port.close', path)
        delete PORTS[path]
      })
      PORTS[path].on('error', error => {
        event.sender.send('port.error', path, error)
      })
      PORTS[path].on('data', buffer => {
        console.log('data', buffer)
        event.sender.send('port.data', path, buffer)
      })
    } else {
      console.log('Port', path, 'already open')
    }
  })

  ipcMain.on('port.close', (event, path) => {
    if (PORTS[path]) {
      console.log('Closing port', path)
      PORTS[path].close()
    } else {
      console.log('Port', path, 'not opened')
    }
  })

  ipcMain.on('port.write', (event, path, buffer) => {
    if (PORTS[path]) {
      console.log('Writting to port', path, 'content', buffer)
      console.log('result:', PORTS[path].write(buffer, (err, ...args) => {
        if (err) {
          console.error('Error writing to serial port', err)
        } else {
          console.log('Written', ...args)
        }
      }))
    } else {
      console.log('Port', port, 'is closed')
    }
  })

  ipcMain.on('port.exists', async (event, path) => {
    const ports = await SerialPort.list()
    const exists = ports.find(port => port.path === path)
    event.sender.send('port.exists', path, !!exists)
  })

  ipcMain.on('port.list', async (event) => {
    const ports = await SerialPort.list()
    event.sender.send('port.listed', ports)
  })

  ipcMain.on('port.close-all', () => {
    Object.values(PORTS).forEach(port => { port.close() })
  })
})
