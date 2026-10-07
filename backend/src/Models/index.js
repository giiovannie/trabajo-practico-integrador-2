import {UserModel} from "./User.js";
import {ProfileModel} from "./Profile.js";
import {ArticleModel} from "./Article.js";
import {TagModel} from "./Tag.js";
import {ArticleTagModel} from "./Article_Tag.js";


//1:1 User <---> Profile
UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

//1:N User <---> Article
UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "articles"});
ArticleModel.belongsTo(UserModel, { foreignKey: "user_id", as: "author" });

//N:M Article <---> Tag
ArticleModel.belongsToMany(TagModel, {through: ArticleTagModel,foreignKey: "article_id", as: "tags"});
TagModel.belongsToMany(ArticleModel, {through: ArticleTagModel,foreignKey: "tag_id", as: "articles"});