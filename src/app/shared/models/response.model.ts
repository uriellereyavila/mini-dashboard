import { Link } from "./link.model";

export interface ResponseModel<T> {
    data: T[];
    links: Link;
}