declare interface IArticulo {
    id?: number;
    sku?: number;
    articulo?: string;
    marca?: string;
    modelo?: string;
    fecha_alta?: string;
    stock?: number;
    cantidad?: number;
    descontinuado?: boolean;
    fecha_baja?: Date;
    familia_id?: number;
    familia?: IFamilia;
}