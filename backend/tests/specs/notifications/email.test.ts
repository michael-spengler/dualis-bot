import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import sendEmail from '../../../notifications/email.ts';
 
import {
    SmtpClient
} from "../../mocks/smtp.mock.ts";

import {
    assertSpyCall
  } from "https://deno.land/x/mock@0.13.0/mod.ts";

Deno.test("assert true", async ()=>{
    const testSMTPConf = {
        hostname: "hostname",
        port: 123,
        username: "username",
        password: "password"
    }

    const testEmailConf = {
        from: "from",
        to: "to",
        subject: "subject",
        content: "content",
        html: "html"
    }

    assertEquals(await sendEmail(testSMTPConf, testEmailConf), true)
    assertSpyCall(SmtpClient.instance.connectTLS, 0, { args: [ testSMTPConf ], returned: true });
    assertSpyCall(SmtpClient.instance.send, 0, { args: [ testEmailConf ], returned: true });
    assertSpyCall(SmtpClient.instance.close, 0, { returned: true });
}); 