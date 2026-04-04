const information = document.getElementById('info')

const func = async () => {
    const response = await window.versions.ping()
    console.log(response)
}

const debugButton = document.getElementById('btnDebug')
const debugInput = document.getElementById('debugStatus')
debugButton.addEventListener('click', () => {
    const debug = debugInput.value
    window.electronAPI.system.setDebug(debug)
})

const buttonOpenFile = document.getElementById('btnOpenFile')
const filePathElement = document.getElementById('filePath')
buttonOpenFile.addEventListener('click', async () => {
    const filePath = await window.electronAPI.system.openFile()
    filePathElement.innerText = filePath
})

func()
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`