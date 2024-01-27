
export class PaginationResult<A> {
    data: Array<A>
    page: number
    total_pages: number
    total_count: number
}