export interface MovieResponse {
    id: number,
    title: string,
    poster_path: string,
    lox: boolean
}
export interface ResultInfo {
    resCount: number,
    searchedTitle: string | string[]
}