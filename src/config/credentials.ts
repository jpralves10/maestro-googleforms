export const MONGODB_HOST = process.env.MONGODB_HOST || '35.198.13.166:27017';
export const MONGODB_USER = process.env.MONGODB_USER || 'catalogo';
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'QUsMspeS3Acx3wXm';
export const MONGODB_AUTHDB = process.env.MONGODB_AUTHDB || 'catalogo-produtos';

//https://www.youtube.com/watch?v=cRbf_33Rdo4

const URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_AUTHDB}`;
//const URI_LOCAL = `mongodb://@localhost:27017/crawler`;

//export const MONGODB_CONNECTIONSTRING = process.env.MONGODB_URI || URI
export const MONGODB_CONNECTIONSTRING = URI