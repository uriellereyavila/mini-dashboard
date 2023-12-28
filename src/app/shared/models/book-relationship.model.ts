export interface BookRelationShip {
    authors: {
        links: {
            self: string;
            related: string;
        };
    };
    publishers: {
        links: {
            self: string;
            related: string;
        };
    };
}