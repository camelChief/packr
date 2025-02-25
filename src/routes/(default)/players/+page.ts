import { ActionType, type PageData } from "$lib/models/page-data";
import { Plus } from "lucide-svelte";

// todo: type this
export function load(): PageData {
    return {
        title: "Manage Players",
        useBackButton: true,
        backButtonUrl: "/",
        actions: [
            {
                type: ActionType.Button,
                reference: "openAddPlayerModal",
                icon: Plus,
                class: "btn-success",
            }
        ],
    };
}