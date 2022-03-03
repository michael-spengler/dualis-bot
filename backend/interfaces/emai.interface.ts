export interface ISMTPConf {
    hostname: string,
    port: number,
    username: string;
    password: string;
}

export interface IEmailConf {
    from: string;
    to: string;
    subject: string;
    content: string;
    html: string;
}