const url = require('url')
const path = require('path')
const development = require('electron-is-dev')
const SerialPort = require('serialport')
const { app, ipcMain, BrowserWindow } = require('electron')

const PORTS = {}
let window = null

async function initializeSerialPort() {
  ipcMain.on('serial.open', (event, path) => {
    if (!PORTS[path]) {
      PORTS[path] = new SerialPort(path)
      PORTS[path].on('open', () => {
        event.sender.send('serial.open', path)
      })
      PORTS[path].on('close', () => {
        event.sender.send('serial.close', path)
        PORTS[path].removeAllListeners()
        PORTS[path].destroy()
        delete PORTS[path]
      })
      PORTS[path].on('error', error => {
        event.sender.send('serial.error', path, error)
      })
      PORTS[path].on('data', buffer => {
        event.sender.send('serial.data', path, buffer)
      })
    }
  })

  ipcMain.on('serial.close', (event, path) => {
    if (PORTS[path]) {
      PORTS[path].close()
    }
  })

  ipcMain.on('serial.write', (event, path, buffer) => {
    if (PORTS[path]) {
      PORTS[path].write(buffer, err => {
        if (err) {
          console.error('Error writing to serial port', err)
        }
        event.sender.send('serial.write-completed', { error: err || false })
      })
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
    Object.values(PORTS).forEach(port => {
      port.close()
    })
  })

  let availablePorts = ''
  let isRefreshingPorts = false

  setInterval(async () => {
    if (!isRefreshingPorts && window) {
      isRefreshingPorts = true
      try {
        const ports = await SerialPort.list()
        const portsValue = JSON.stringify(ports)
        if (portsValue !== availablePorts) {
          availablePorts = portsValue
          window.send('serial.list-updated', ports)
        }
      } finally {
        isRefreshingPorts = false
      }
    }
  }, 500)
}

async function initializeSystemRequests() {
  ipcMain.on('system.properties', (event) => {
    event.sender.send('system.properties', {
      os: {
        type: require('os').type(),
        version: process.getSystemVersion()
      },
      versions: process.versions
    })
  })
}

async function initializeFrontendBuildProcess() {
  if (development) {
    const { createServer } = require('vite')
    const server = await createServer({})
    await server.listen()
  }
}

async function initializeMainWindow() {
  window = new BrowserWindow({
    icon: path.join(app.getAppPath(), './', 'build/icons/128x128.png'),
    webPreferences: {
      devTools: true,
      preload: path.join(app.getAppPath(), './', 'preload.js'),
    }
  })
  window.maximize()
  if (development) {
    window.webContents.openDevTools()
    window.loadURL('http://localhost:3000')
  } else {
    // window.setMenu(null)
    // window.webContents.openDevTools()
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: "file:",
        slashes: true
      })
    )
  }
}

app.on('ready', async () => {
  await initializeSerialPort()
  await initializeSystemRequests()
  await initializeFrontendBuildProcess()
  await initializeMainWindow()
})
