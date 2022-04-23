import {Schema, model} from mongoose

const ArticleSchema = new Schema(
    {

    }
)

const ArticleModel = model("Article", ArticleSchema)

export { ArticleModel }