# Endpoint documentation

This document details the endpoints exposed on the service written for the final project of the January 2019 FT class.
These endpoints are used for communication between the server and client of our project.

## File Endpoints:
---
|         URL        | METHOD |               Description               |                       Request                        |               Success                |                                  Failure                                  |
|:------------------:|:------:|:---------------------------------------:|:----------------------------------------------------:|:------------------------------------:|:-------------------------------------------------------------------------:|
| /files             |  POST  | Upload a file and save it on the server | Body: { name: string, data: string, folder: string } | Status: 201 Body: { fileId: number } | Status: 400 | 409 Body: {  message: error uploading file }                |
| /files             | DELETE | Send a group of files to the trash      | Body: {  ids: [number]  }                            | Status: 200                          | Status: 400 | 404 Body: { message: There was an issue deleting the file } |
| /files/:id         |   GET  | Download a single file                  |                                                      | Status: 200 Body: { data: base64 }   | Status: 404 Body: { message: Could not download file. File not found }    |
| /files/:id         |  PATCH | Move a file into or out of a folder     | Body: { folderId: number }                           | Status: 200                          | Status: 400 | 404 | 409 Body: { message: Cannot move file }               |
| /files/:id         | DELETE | Delete a single file                    |                                                      | Status: 200                          | Status: 404 Body: { message: Unable to trash file. File not found. }      |
| /files/:id/restore |  POST  | Restore a file from the trash           |                                                      | Status: 200                          | Status: 400 | 404 Body: { message: Could not restore file }               |

## Folder Endpoints:
---
|          URL         | METHOD |            Description             |        Request         |                                                                       Success                                                                        |                                   Failure                                   |
|:--------------------:|:------:|:----------------------------------:|:----------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|
| /folders             |  POST  | Create a folder                    | Body: { name: string } | Status: 201 Body: { folderId: number }                                                                                                               | Status: 400 | 409 Body: {  message: error creating the folder }             |
| /folders/:id         | DELETE | Move a folder to the trash         |                        | Status: 200                                                                                                                                          | Status: 400 | 404 Body: { message: There was an issue deleting the folder } |
| /folders/:id         |   GET  | Download a single folder           |                        | Status: 200 Body: { created: datetime, name: string, id: number, files: [{   id: number,   name: string,   folder: string,    created: datetime  }}] | Status: 404 Body: { message: Could not download folder. Folder not found }  |
| /folders/root        |   GET  | Get everything in the root folder  |                        | Status: 200Body: { files: [fileObject], folders: [folderObject] }                                                                                    |                                                                             |
| /folders/trash       |   GET  | Get everything in the trash folder |                        | Status: 200 Body: { files: [fileObject], folders: [folderObject] }                                                                                   |                                                                             |
| /folders/trash       | DELETE | Delete all trashed folders         |                        | Status: 200                                                                                                                                          | Status: 400 Body: { message: Could not delete folders }                     |
| /folders/:id/restore | POST   | Restore a folder from trash        |                        | Status: 200                                                                                                                                          | Status: 404 Body: { message: Could not restore folder }                     |
