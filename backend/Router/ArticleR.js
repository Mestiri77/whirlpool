const express = require('express');
const router = express.Router();
const articleController = require('../controllers/ArticleC');

// Routes pour les articles
router.post('/articles', articleController.createArticle);
router.get('/articles', articleController.getAllArticles);
router.get('/articles/:id', articleController.getArticleById);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);
router.get('/articlesbyref/:id', articleController.getArticleByrefId);
router.get('/artCat/:Categoryname',articleController.getArticlesByCategory)
router.get('/articledet/:category/:pdv/:date',articleController.getArticleDetails)
router.post('/articlesCU',articleController.GettingArticlebyCU)
router.post('/arcticlebyCC/:id',articleController.getArticleByCouleurAndCapcite)
router.get('/colors',articleController.getAllColors)
router.put('/price/:id',articleController.updatprice)
router.get('/whirlpool',articleController.getArticlesByMarque)
router.get('/artpdv/:pdvname/:mois',articleController.getArticlesBypdv)

module.exports = router;
