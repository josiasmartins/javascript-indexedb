'use strict';

System.register(['./HttpService', './ConnectorFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectorFactory) {
            ConnectionFactory = _ConnectorFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'obterNegociacoesDaSemana',
                    value: function obterNegociacoesDaSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            _this._http.get('negociacoes/semana').then(function (negociacoes) {
                                console.log(negociacoes);
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('N??o foi poss??vel obter as negocia????es da semana');
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoesDaSemanaAnterior',
                    value: function obterNegociacoesDaSemanaAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                                console.log(negociacoes);
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('N??o foi poss??vel obter as negocia????es da semana anterior');
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoesDaSemanaRetrasada',
                    value: function obterNegociacoesDaSemanaRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                                console.log(negociacoes);
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('N??o foi poss??vel obter as negocia????es da semana retrasada');
                            });
                        });
                    }
                }, {
                    key: 'obterNegociacoes',
                    value: function obterNegociacoes() {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {

                            Promise.all([_this4.obterNegociacoesDaSemana(), _this4.obterNegociacoesDaSemanaAnterior(), _this4.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

                                var negociacoes = periodos.reduce(function (dados, periodo) {
                                    return dados.concat(periodo);
                                }, []).map(function (dado) {
                                    return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
                                });

                                resolve(negociacoes);
                            }).catch(function (erro) {
                                return reject(erro);
                            });
                        });
                    }
                }, {
                    key: 'cadastra',
                    value: function cadastra(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negocia????o adicionado com sucesso';
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('N??o foi poss??vel adicionar a negocia????o');
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('N??o foi poss??vel obter as negocia????es');
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function () {
                            return 'Negocia??oes apagadas com sucesso';
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('N??o foi poss??vel apagar as negocia????es');
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(listaAtual) {

                        return this.obterNegociacoes().then(function (negociacoes) {
                            return (
                                // filter: percore cada iten da negocia????o e vai jogar dentro de negocia????o
                                negociacoes.filter(function (negociacao) {
                                    return (
                                        // some: verifica de cada iten existente ?? igual a negociacao que estou filtrando...se for, retorne true
                                        !listaAtual.some(function (negociacaoExistente) {
                                            return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                        })
                                    );
                                })
                            );
                        }).catch(function (err) {
                            console.log(err);
                            throw new Error('N??o foi poss??vel buscar negocia????es para importar');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map