import HTTP, { proccesRequest } from "../clients/NaPopravkuHTTPClient"
import axios from "axios";
export interface _File {
    id: number,
    folder_id?: number,
    name: string,
    full_name: string,
    size: number,
    public_url: string
}
export default class FileService {
    static UploadFile(file: File, folderId: number | undefined = undefined) {
        const bodyFormData = new FormData();
        bodyFormData.append('file', file)
        if (folderId) {
            bodyFormData.append('folder_id', '' + folderId)
        }
        return proccesRequest(HTTP.post(`/files`, bodyFormData))
    }
    static PublishFile(file_id:number){
        return proccesRequest(HTTP.post(`/files/${file_id}/publish`))
    }
    static GetFiles(folder_id: number | null = null) {
        if (folder_id) {
            return proccesRequest(HTTP.get(`/files?folder_id=${folder_id}`))
        }
        return proccesRequest(HTTP.get(`/files`))
    }
    static GetFileById(file_id: number | null = null) {
        return proccesRequest(HTTP.get(`/files/${file_id}`))
    }
    static RenameFile(file_id: number, newName: string) {
        return proccesRequest(HTTP.patch(`/files/${file_id}?name=${newName}`))
    }
    static DeleteFile(file_id: number) {
        return proccesRequest(HTTP.delete(`/files/${file_id}`))
    }
    static async DownloadFile(file_id: number) {
        const resp = await axios({
            url: 'http://api.dev/file-download',
            method: 'GET',
            responseType: 'blob',
        })
        return resp
    }
}