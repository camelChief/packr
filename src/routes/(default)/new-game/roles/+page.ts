import type { PageData } from "$lib/models/page-data";

export function load(): PageData {
    return {
        title: "Select Roles",
        breadcrumbs: ["New Game"],
        useBackButton: true,
        backButtonUrl: "/new-game/players",
    };
}