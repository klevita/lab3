import HTTP, { proccesRequest } from "../clients/NaPopravkuHTTPClient"
export interface _Folder {
    id: number,
    name: string,
    size: number,
}
export default class FolderService {
    static GetFolders() {
        return proccesRequest(HTTP.get(`/folders`))
    }
    static AddFolder(name:string) {
        return proccesRequest(HTTP.post(`/folders?name=${name}`))
    }
}