"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var db = __importStar(require("./classificacao.database"));
var sheet = __importStar(require("./classificacao.sheet"));
var spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';
//var request = require('request');
// Classificacao
exports.setClassificacaoEmail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros;
    return __generator(this, function (_a) {
        parametros = res.body;
        db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    var qtdRespostas = classificacao.respostas.length;
                    var range = 'B' + qtdRespostas + ':' + 'B' + qtdRespostas;
                    sheet.setSpreedsheetEmail(parametros.spreadsheetId, range, [parametros.idResposta]) ?
                        res.send('200') : res.send('400');
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.setClassificacao = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros, sheets, colunas, respostas, setSortClassificacoes, setNewClassificacao, getHeader, getColunas, getRespostas, getVerificarVersao;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parametros = {
                    spreadsheetId: spreadsheetId,
                    idSheet: 1997890537,
                    nmSheet: 'FORMULÁRIO NCM - HCX CONSULTORIA'
                };
                return [4 /*yield*/, sheet.getSpreedsheet(parametros.spreadsheetId, 'A1:ZZZ100000')];
            case 1:
                sheets = _a.sent();
                colunas = [];
                respostas = [];
                sheets.forEach(function (sheet, i) {
                    i == 0 ?
                        sheet.forEach(function (item) { colunas.push(item); }) :
                        respostas.push(sheet);
                });
                db.classificacaoFindByidSheet(parametros.idSheet).then(function (classificacoes) {
                    if (classificacoes.length == 0) {
                        setNewClassificacao(0);
                    }
                    else {
                        setSortClassificacoes(classificacoes);
                        var classificacao = classificacoes[0];
                        if (getVerificarVersao(classificacao)) {
                            classificacao.respostas = [];
                            getRespostas(classificacao);
                            db.classificacaoUpdate(classificacao);
                        }
                        else {
                            setNewClassificacao(++classificacao.version);
                        }
                    }
                }).catch(function (e) {
                    console.log(e);
                });
                setSortClassificacoes = function (classificacoes) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        classificacoes.sort(function (a, b) { return a.version > b.version ? 1 : -1; });
                        return [2 /*return*/];
                    });
                }); };
                setNewClassificacao = function (version) { return __awaiter(_this, void 0, void 0, function () {
                    var classificacao;
                    return __generator(this, function (_a) {
                        classificacao = {};
                        classificacao.version = version;
                        getHeader(classificacao);
                        getColunas(classificacao);
                        getRespostas(classificacao);
                        classificacao.comentarios = [];
                        db.classificacaoSave(classificacao);
                        return [2 /*return*/];
                    });
                }); };
                getHeader = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        classificacao.spreadsheetId = parametros.spreadsheetId;
                        classificacao.idSheet = parametros.idSheet;
                        classificacao.nmSheet = parametros.nmSheet;
                        return [2 /*return*/];
                    });
                }); };
                getColunas = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        classificacao.colunas = [];
                        colunas.forEach(function (item, i) {
                            classificacao.colunas.push({
                                'idColuna': i,
                                'nmColuna': item
                            });
                        });
                        return [2 /*return*/];
                    });
                }); };
                getRespostas = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        classificacao.respostas = [];
                        respostas.forEach(function (resposta) {
                            var campos = [];
                            var campo;
                            var idResposta = '';
                            var carimbo = '';
                            resposta.forEach(function (item, i) {
                                if (i == 0) {
                                    carimbo = item;
                                }
                                else if (i == 1) {
                                    idResposta = item;
                                }
                                else if (i > 1) {
                                    campo = {
                                        'idColuna': classificacao.colunas[i].idColuna,
                                        'deCampo': item
                                    };
                                    campos.push(campo);
                                }
                            });
                            classificacao.respostas.push({
                                'idResposta': idResposta,
                                'carimbo': carimbo,
                                'campos': campos
                            });
                        });
                        return [2 /*return*/];
                    });
                }); };
                getVerificarVersao = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (classificacao.colunas.length != colunas.length) {
                            return [2 /*return*/, false];
                        }
                        classificacao.colunas.forEach(function (dbcoluna) {
                            var flColuna = false;
                            colunas.forEach(function (coluna) {
                                if (coluna == dbcoluna.nmColuna) {
                                    flColuna = true;
                                }
                            });
                            if (!flColuna) {
                                return false;
                            }
                        });
                        return [2 /*return*/, true];
                    });
                }); };
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); };
exports.getClassificacao = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var classificacao;
    return __generator(this, function (_a) {
        classificacao = req.body;
        db.classificacaoFindBySpreadsheetId(classificacao.spreadsheetId).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                res.send(classificacoes);
            }
            else {
                res.send([]);
            }
        }).catch(function (e) {
            console.log(e);
        });
        return [2 /*return*/];
    });
}); };
// Colunas
exports.getColunas = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros;
    return __generator(this, function (_a) {
        parametros = req.body;
        console.log(parametros);
        db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    if (classificacao.colunas.length > 0) {
                        res.send(classificacao.colunas);
                    }
                    else {
                        res.send([]);
                    }
                });
            }
            else {
                res.send([]);
            }
        });
        return [2 /*return*/];
    });
}); };
// Comentario
exports.getComentarios = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var parametros, comentarios;
    return __generator(this, function (_a) {
        parametros = {
            spreadsheetId: '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ',
            idSheet: 1997890537,
            idResposta: 'jean@eficilog.com'
        };
        comentarios = [];
        db.classificacaoFindBySpreadsheetId(parametros.spreadsheetId).then(function (classificacoes) {
            if (classificacoes.length > 0) {
                classificacoes.forEach(function (classificacao) {
                    if (classificacao.comentarios.length > 0) {
                        classificacao.comentarios.forEach(function (dbcomentario) {
                            if (dbcomentario.idResposta == parametros.idResposta) {
                                comentarios.push(dbcomentario);
                            }
                        });
                        res.send(comentarios);
                    }
                    else {
                        res.send([]);
                    }
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.setComentarios = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var comentarios, comentario_1, googleNotes;
    var _this = this;
    return __generator(this, function (_a) {
        /*let comentarios = [{
            idSheet: 1997890537,
            idComentario: null,
            idResposta: 'jean@eficilog.com',
            idColuna: 3,
            idUsuario: 'jean@eficilog.com',
            nmUsuario: 'Jean Alves',
            descricao: "Teste do caompo: 'Mercadoria completa'",
            status: 'Pendente',
            dataCriacao: new Date(),
            dataAtualizacao: new Date()
        }]*/
        console.log('Coment: ', req.body);
        comentarios = req.body;
        //let classificacao;
        //comentarios.forEach(comentario => {
        if (comentarios.length > 0) {
            comentario_1 = comentarios[0];
            db.classificacaoFindByIdSheetAndVersion(comentario_1.idSheet, comentario_1.sheetVersao).then(function (classificacoes) {
                var classificacao = classificacoes[0];
                comentario_1.side = undefined;
                var flcomentario = false;
                var idComentarioMax = Math.max.apply(Math, classificacao.comentarios.map(function (maxCom) {
                    return maxCom.idComentario;
                }));
                classificacao.comentarios.forEach(function (dbcomentario) {
                    if (dbcomentario.idComentario == comentario_1.idComentario &&
                        dbcomentario.idResposta == comentario_1.idResposta &&
                        dbcomentario.idColuna == comentario_1.idColuna) {
                        dbcomentario.descricao = comentario_1.descricao;
                        dbcomentario.status = comentario_1.status;
                        dbcomentario.dataAtualizacao = new Date();
                        flcomentario = true;
                    }
                });
                if (flcomentario) {
                    console.log('A', idComentarioMax);
                    db.classificacaoUpdate(classificacao);
                }
                else {
                    console.log('B', idComentarioMax);
                    if (idComentarioMax == undefined || idComentarioMax == null || idComentarioMax == 0) {
                        idComentarioMax = 0;
                        comentario_1.idComentario = idComentarioMax;
                    }
                    else {
                        comentario_1.idComentario = ++idComentarioMax;
                    }
                    //idComentarioMax == 0 ? comentario.idComentario = idComentarioMax :  comentario.idComentario = ++idComentarioMax;
                    classificacao.comentarios.push(comentario_1);
                    db.classificacaoUpdate(classificacao);
                }
                //console.log('Classificacao', classificacao)
                //googleNotes(classificacao)
                res.send([classificacao]);
            }).catch(function (e) {
                console.log(e);
            });
        }
        else {
            res.send([]);
        }
        //})
        comentarios = undefined;
        googleNotes = function (classificacao) { return __awaiter(_this, void 0, void 0, function () {
            var parametro;
            return __generator(this, function (_a) {
                classificacao.comentarios.forEach(function (comentario) {
                    comentario;
                });
                classificacao.respostas.forEach(function (resposta) {
                    (resposta.idResposta);
                });
                sheet.setSpreedsheetNotes(parametro);
                res.sendStatus(200);
                return [2 /*return*/];
            });
        }); };
        return [2 /*return*/];
    });
}); };
