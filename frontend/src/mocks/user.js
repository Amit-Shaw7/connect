export const user = {
    _id: "12",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    cover: "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=600",
    likes: ["4", "5", "6", "1", "2", "3"],
    name: "Amit kumar shaw",
    username: "@amit",
    tagline: "Aspiring developer",
    portfolio: "https://amitshaw.vercel.app",
    followers: ["1", "2", "3", "4", "5"],
    following: ["1", "2"],
    phone: 1234567890,

    commnts: ["1", "2", "3", "6"],
    posts: [
        {
            _id: "1",
            title: "First Post",
            media: "https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&w=600",
            createdAt: "2month ago",
            user: {
                name: "Amit kumar shaw",
                username: "@amit",
                avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
        },
        {
            _id: "2",
            title: "Second Post",
            media: "https://images.pexels.com/photos/161097/allgau-eisenberg-ostallgau-bavaria-161097.jpeg?auto=compress&cs=tinysrgb&w=600",
            createdAt: "2month ago",
            user: {
                name: "Amit kumar shaw",
                username: "@amit",
                avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
        },
        {
            _id: "3",
            title: "Third Post",
            media: "https://images.pexels.com/photos/552766/pexels-photo-552766.jpeg?auto=compress&cs=tinysrgb&w=600",
            createdAt: "2month ago",
            user: {
                name: "Amit kumar shaw",
                username: "@amit",
                avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
        },
    ]

}