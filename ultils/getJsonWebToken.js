import jwt from 'jsonwebtoken';

export class JWT {
    static GetJWT = ({id, username}) => {
        const payload = {id,username}

        const token = jwt.sign(payload,process.env.SECRET_KEY)

        return token
    }
}