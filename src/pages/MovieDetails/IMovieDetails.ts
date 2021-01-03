export interface GenreProps {
    id: number,
    name: string
}

export interface MovieProps {
    id: number,
    posterPath?: string,
    backdropPath?: string,
    genres: GenreProps[],
    overview: string,
    title: string
}