import { IEmailConf, ISMTPConf } from "../../interfaces/emai.interface.ts";
import {
    assertSpyCall,
    assertSpyCalls,
    Spy,
    spy,
  } from "https://deno.land/x/mock@0.13.0/mod.ts";

export function connectTLS(smtpConf: ISMTPConf) {
    return true;
}

export function send(emailConf: IEmailConf) {
    return true;
}

export function close() {
    return true;
}

export class SmtpClient {
    public static instance: SmtpClient;

    constructor() {
        SmtpClient.instance = this;
    }

    public connectTLS = spy(connectTLS);
    public send = spy(send);
    public close = spy(close);
}