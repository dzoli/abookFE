export interface Project {
    //['title', 'label', 'pmf_status', 'project_manager', 'start_year','duration'];

    id: number;
    title: string;
    label: string;
    pmf_status: string;
    project_manager: string;
    start_year: number;
    duration: number;
    role: string;
    
}