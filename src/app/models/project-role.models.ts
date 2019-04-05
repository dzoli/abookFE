export class ProjectRole {

    // id: number;
    // title: string;
    // label: string;
    // pmf_status: string;
    // project_manager: string;
    // start_year: number;
    // duration: number;
    // role: string;

    constructor(
        public id: number,
        public title: string,
        public label: string,
        public pmf_status: string,
        public project_manager: string,
        public start_year: number,
        public duration: number,
        public role: number) {    }

    public set changeRole(newRole: number){
    }

}