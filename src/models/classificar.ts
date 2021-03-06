import { IProduto } from "./produtos";
import { IClassificacao } from "./classificacao";

export interface IClassificar {

    _id?: any,
    codigo:number,
    titulo?: string,
    version?: number,
    status?: string;
    dataCriacao?: Date,
    dataAtualizacao?: Date,
    rating:number,
    ratingComentario:string,
    usuario?: {
        nome:string,
        email:string
    };
    produto?: IProduto
    classificacao?: IClassificacao
}