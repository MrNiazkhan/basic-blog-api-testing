import Link from "next/link";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {article.coverImage && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{article.summary}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-gray-700 text-sm">{article.author.name}</span>
          </div>
          <span className="text-gray-500 text-xs">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
