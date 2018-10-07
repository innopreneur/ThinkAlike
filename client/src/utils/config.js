//config file
export default {
    SERVER : {
        PROTOCOL: "http",
        HOST : "localhost",
        PORT : 4006,
    },

    ROUTES: {
        NEW_GAME: "/game",
        GET_GAMES: "/games",
        ACTIVE_QUERY: "?isActive=true",
        INACTIVE_QUERY: "?isActive=false"
    }
}