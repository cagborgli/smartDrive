import { saveAs } from 'file-saver'

export const getBase64String = file =>
  new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.onerror = error => reject(error)
  })

export const dataURItoBlob = (data, type) => {
  let byteString = window.atob(data)
  let ab = new ArrayBuffer(byteString.length)
  let ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; ++i) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new window.Blob([ab], { type })
}

export const saveData = (name, data, type) => {
  saveAs(dataURItoBlob(data, type), name)
}
