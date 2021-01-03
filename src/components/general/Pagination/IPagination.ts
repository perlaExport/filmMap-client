export interface PaginationProps {
    currentPage: number,
    amountOfPages: number,
    handleChange: (page: number) => void
}

export interface PageProps {
    currentPage: number,
    amountOfPages: number
}