import { formatLeadSms, type LeadForNotification } from "@/lib/leadFormatting";

export type SmsMessage = {
  to: string;
  from?: string;
  text: string;
};

export interface SmsProviderClient {
  send(message: SmsMessage): Promise<void>;
}

class ConsoleSmsProvider implements SmsProviderClient {
  constructor(private readonly providerName: string) {}

  async send(message: SmsMessage) {
    console.info(
      `SMS provider "${this.providerName}" is configured, but no concrete adapter is attached. Message was not sent.`,
      {
        to: message.to,
        from: message.from,
        text: message.text,
      },
    );
  }
}

function createSmsProvider(providerName: string): SmsProviderClient {
  return new ConsoleSmsProvider(providerName);
}

export async function sendSmsLead(lead: LeadForNotification) {
  const provider = process.env.SMS_PROVIDER;
  const apiKey = process.env.SMS_API_KEY;
  const to = process.env.SMS_TO;

  if (!provider) {
    console.info("SMS notifications are not configured: SMS_PROVIDER is missing.");
    return false;
  }

  if (!apiKey || !to) {
    console.info("SMS notifications are not configured: SMS_API_KEY or SMS_TO is missing.");
    return false;
  }

  const client = createSmsProvider(provider);

  await client.send({
    to,
    from: process.env.SMS_FROM,
    text: formatLeadSms(lead),
  });

  return true;
}
