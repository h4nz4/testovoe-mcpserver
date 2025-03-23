export interface NewsFeedResponse {
  status: string
  totalResults: number
  articles: NewsFeedArticle[]
}

export interface NewsFeedArticle {
  source: NewsFeedSource
  author?: string
  title: string
  description?: string
  url: string
  urlToImage: string
  publishedAt: string
  content?: string
}

export interface NewsFeedSource {
  id?: string
  name: string
}
