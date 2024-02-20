export class Fetcher {
  private baseUrl: string;
  private appId: string;
  private secret: string;

  constructor(config: { baseUrl: string; appId: string; secret: string }) {
    this.baseUrl = config.baseUrl;
    this.appId = config.appId;
    this.secret = config.secret;
  }

  private async fetch(path: string, options: RequestInit) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${this.appId}:${this.secret}`)}`,
      },
    });

    return response;
  }

  async getServices() {
    this.fetch("/service-types", { method: "GET" });
  }
}
