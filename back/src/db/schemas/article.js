import { Schema, model } from mongoose

const ArticleSchema = new Schema(
    {
        id: {
            type : String,
            required: true
        },
        author: {
            type : String,
            required: true,
        },
        category: {
            type : String,
            required: true,
        },
        title: {
            type : String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            default: []
        },
        tags: {
            type: [String],
            default: []
        },
    },
    {
        timestamps: true,
    }
)

const ArticleModel = model("Article", ArticleSchema)

export { ArticleModel }