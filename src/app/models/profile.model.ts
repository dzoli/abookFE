export class Profile {

    constructor(
        public id: number,
        public address: string,
        public department: string,
        public office: string,
        public personal_web_site: string,
        public phone: string,
        public profile_img: string,
        public workplace: string,
        public user: User
    ) {}

}

export class User {
    
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public username: string

    ) {    }

}