export default interface reviewType {
    owner: {
        name: String,
        userName: String,
        profilePic: string
    },
    date: Date
    review: string,
    rating?: number
}