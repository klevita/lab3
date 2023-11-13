import HTTP, {proccesRequest} from "../clients/NaPopravkuHTTPClient"
export default class AuthService{
    static Login(email:string,pass:string) {
        return proccesRequest(HTTP.post(`/auth/login?email=${email}&password=${pass}`))
    } 
    static Logout() {
        return proccesRequest(HTTP.post(`/auth/logout`))
    } 
    static Register(email:string,pass:string,name:string) {
        return proccesRequest(HTTP.post(`/auth/register?email=${email}&name=${name}&password=${pass}`))
    } 
}