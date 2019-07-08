"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CatalogoController = __importStar(require("./catalogo/catalogo.controller"));
var ClassificacaoController = __importStar(require("./classificacao/classificacao.controller"));
var ComentariosControlller = __importStar(require("./classificacao/comentarios.controller"));
var CategoriasControlller = __importStar(require("./classificacao/categorias-form.controller"));
var ClassificarController = __importStar(require("./classificacao/classificar.controller"));
//import * as GoogleAuth from './classificacao/classificacao.sheet';
var router = express_1.Router();
router.post('/filtro/catalogo', CatalogoController.filtro);
router.post('/comentario/find', ComentariosControlller.getFindComentarios);
router.post('/comentario/save', ComentariosControlller.setComentarios);
router.post('/classificacao/findAll', ClassificacaoController.getFindAllClassificacao);
router.post('/classificacao/find', ClassificacaoController.getFindClassificacao);
router.post('/classificacao/save', ClassificacaoController.setClassificacao);
router.post('/classificar/findAll', ClassificarController.getFindAllClassificar);
router.post('/classificar/find', ClassificarController.getFindClassificar);
router.post('/classificar/save', ClassificarController.setClassificar);
router.post('/classificar/saveProduto', ClassificarController.setProduto);
router.post('/categoriasForm/find', CategoriasControlller.getFindCategoriasForm);
router.post('/categoriasForm/save', CategoriasControlller.setCategoriasForm);
router.post('/categoriasForm/remove', CategoriasControlller.delCategoriasForm);
exports.default = router;
