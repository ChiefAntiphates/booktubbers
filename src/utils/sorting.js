export const SORT_BY = {
    DATE_READ_LAST: 'Date Last Read',
    DATE_READ_FIRST: 'Date First Read',
    DATE: 'Date Published',
    AUTHOR: 'Author',
    NAME: 'Name',
    RATING: 'Rating'
}

export const sort = sortBy => {
    let sortFunction = (a,b) => 1
    switch(sortBy) {
        case SORT_BY.AUTHOR:
            sortFunction = (a,b) => a["author-id"] > b["author-id"] ? 1 : -1
            break;
        case SORT_BY.DATE:
            sortFunction = (a,b) => a["publication-date-fmt"] > b["publication-date-fmt"] ? 1 : -1
            break;
        case SORT_BY.NAME:
            sortFunction = (a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            break;
        case SORT_BY.RATING:
            sortFunction = (a,b) => a.averageRating < b.averageRating ? 1 : -1
            break;
        case SORT_BY.DATE_READ_FIRST:
            sortFunction = (a,b) => new Date(Math.min.apply(null, a.reads.map(read => read.dateFmt))) - new Date(Math.min.apply(null, b.reads.map(read => read.dateFmt)))
            break;
        case SORT_BY.DATE_READ_LAST:
            sortFunction = (a,b) => new Date(Math.max.apply(null, b.reads.map(read => read.dateFmt))) - new Date(Math.max.apply(null, a.reads.map(read => read.dateFmt)))
    };
    return sortFunction
}