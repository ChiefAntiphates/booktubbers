export const capitalise = word => word.charAt(0).toUpperCase() + word.slice(1)

export const reformatDate = strDate => {
    let dateSplit = strDate.split("/")
    return new Date(`${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`);
}

export const getAverageRating = reads => {
    return reads.reduce((total, read) => read.rating + total, 0)/reads.length
    
}