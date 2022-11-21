const {app, BrowserWindow, ipcMain} = require('electron');

const { contacts, chats } = require('./data')

function createWindow(){
    let win = new BrowserWindow({
        width:1000,
        height: 600,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }        
    })

    win.loadFile('index.html')
    
    //win.webContents.openDevTools();

    //Sen an event
    win.webContents.on('did-finish-load',()=>{        
        //win.webContents.send('data-from-server', {'key':'value'})
        //win.webContents.send('pr-chats', chats );
        win.webContents.send('pr-contacts', contacts);
    })

    ipcMain.on('data-from-web', (event,data)=>{
        console.log("Msj from web " + data);
    })

    ipcMain.on('pp-get-chat', (event,arg)=>{
        win.webContents.send('pr-chats', chats[arg])
    })
    
}

app.whenReady().then(()=>{
    createWindow()
})