import { createApi } from '../utils/api'

const apiUrl = 'http://localhost:5000/api'

const filesApi = createApi(apiUrl)

export const createFiles = filesApi('/files', 'POST', true)
export const updateFiles = filesApi('/files', 'PATCH', false)
export const getFiles = filesApi('/files', 'GET', true)
export const getTrash = filesApi('/trash', 'GET', true)
export const downloadFile = id => filesApi(`/files/${id}/download`, 'GET', true)
export const deleteFiles = filesApi('/trash', 'DELETE', false)
