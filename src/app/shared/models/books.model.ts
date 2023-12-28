import { BookAttribute } from "./book-attribute.model";
import { BookRelationShip } from "./book-relationship.model";
import { Link } from "./link.model";

export interface Book {
    id: string;
    type: string;
    links: Link;
    attributes: BookAttribute;
    relationships: BookRelationShip;
}