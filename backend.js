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
  
  ipcMain.on('serial.open', (event, path) => {
    if (!PORTS[path]) {
      console.log('Opening port', path)
      PORTS[path] = new SerialPort(path)
      PORTS[path].on('open', () => {
        console.log('serial.open', path)
        event.sender.send('serial.open', path)
      })
      PORTS[path].on('close', () => {
        console.log('serial.close', path)
        event.sender.send('serial.close', path)
        delete PORTS[path]
      })
      PORTS[path].on('error', error => {
        console.log('serial.error', path, error)
        event.sender.send('serial.error', path, error)
      })
      PORTS[path].on('data', buffer => {
        console.log('serial.data', path, buffer)
        event.sender.send('serial.data', path, buffer)
      })
    } else {
      console.log('Port', path, 'already open')
    }
  })

  ipcMain.on('serial.close', (event, path) => {
    if (PORTS[path]) {
      console.log('Closing port', path)
      PORTS[path].close()
    } else {
      console.log('Port', path, 'not opened')
    }
  })

  ipcMain.on('serial.write', (event, path, buffer) => {
    console.log('path', path)
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
      console.log('Port', path, 'is closed')
    }
  })

  ipcMain.on('serial.exists', async (event, path) => {
    const ports = await SerialPort.list()
    const exists = ports.find(port => port.path === path)
    event.sender.send('serial.exists', path, !!exists)
  })

  ipcMain.on('serial.is-open', async (event, path) => {
    if (PORTS[path]) {
      event.sender.send('serial.is-open', path, PORTS[path].isOpen)
    } else {
      event.sender.send('serial.is-open', path, false)
    }
  })

  ipcMain.on('serial.list', async (event) => {
    const ports = await SerialPort.list()
    event.sender.send('serial.listed', ports)
  })

  ipcMain.on('serial.close-all', () => {
    Object.values(PORTS).forEach(port => { port.close() })
  })
})
