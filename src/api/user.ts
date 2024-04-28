import request from '@/utils/http'
import {user,Result} from '@/utils/interface';


export const logins =(params:user):any => request.post('/api/users/login',params)
