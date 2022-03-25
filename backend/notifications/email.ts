import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { IEmailConf, ISMTPConf } from "../interfaces/emai.interface.ts";

export default async function sendEmail(
  smtpConfig: ISMTPConf,
  emailConfig: IEmailConf,
) {
  const client = new SmtpClient();

  try {
    await client.connectTLS(smtpConfig);
    await client.send(emailConfig);
  } finally {
    await client.close();
  }

  return true;
}
