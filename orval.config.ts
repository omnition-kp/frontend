import { defineConfig } from "orval";

export default defineConfig({
    api: {
        input: {
            target: "http://localhost:4000/api/docs-json",
        },
        output: {
            target: "./shared/queries",
            schemas: "./shared/types/server",
            client: "react-query",
            mode: "tags-split",
            override: {
                mutator: {
                    path: "./shared/api/client.ts",
                    name: "customInstance",
                },
                query: {
                    useQuery: true,
                    useMutation: true,
                },
            },
        },
    },
});
