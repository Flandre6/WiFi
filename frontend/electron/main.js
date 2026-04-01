const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const path = require('path')

let pyProc = null

function startBackend() {
  const script = path.join(__dirname, '../../backend/app.py')

  pyProc = spawn('python', [script])

  pyProc.stdout.on('data', (data) => {
    console.log(`[PY] ${data}`)
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  })

  win.loadURL('http://127.0.0.1:5000')
}

app.whenReady().then(() => {
  startBackend()

  setTimeout(createWindow, 2000)
})

app.on('will-quit', () => {
  if (pyProc) pyProc.kill()
})
