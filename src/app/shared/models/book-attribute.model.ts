import { BookProperties } from "./book-properties.model";

export interface BookAttribute {
    urn: string;
    created_at: string;
    updated_at: string;
    content: string;
    properties: any; // Adjust the type based on the actual structure
    display_properties: BookProperties;
}