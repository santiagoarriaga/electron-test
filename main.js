const { exec } = require( 'child_process' )
const { app, BrowserWindow } = require( 'electron' )

const SETUP_COMMAND =
  'C:\\Users\\Santiago\\Source\\Repos\\WinRisePlayerPOC\\Releases\\Setup.exe'
let win

const createWindow = () =>
{
  win = new BrowserWindow(
  {
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  })

  win.loadFile( 'index.html' )
}

const executeSetup = () =>
{
  exec( SETUP_COMMAND, ( error, stdout, stderr ) =>
  {
    error && console.error( error )

    console.log( stdout )
    console.error( stderr )
  })
}

app.whenReady()
. then( createWindow )
. then( () =>
   setTimeout( () =>
   {
     win.loadFile( 'other.html' )

     executeSetup()
   }, 30000 )
 )

app.on( 'window-all-closed', () =>
{
  process.platform !== 'darwin' && app.quit()
})

app.on( 'activate', () =>
{
  BrowserWindow.getAllWindows().length === 0 && createWindow()
})
