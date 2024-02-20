declare module "osc" {
  type UDPConfig = {
    /* The port to listen on */
    localPort: number;
    /* The local address to bind to	"127.0.0.1" */
    localAddress?: string;
    /* The remote port to send messages to (optional)	none */
    remotePort?: number;
    /* The remote address to send messages to (optional)	none */
    remoteAddress?: string;
    /* A flag specifying if messages should be sent via UDP broadcast	false */
    broadcast?: string;
    /* The time to live (number of hops) for a multicast connection (optional)	none */
    multicastTTL?: string;
    /* An array of multicast addresses to join when listening for multicast messages (optional)	none */
    multicastMembership?: string;
    /* A raw dgram.Socket to use instead of osc.js creating one for you; if supplied, it is your job to configure and bind it appropriately	none */
    socket?: string;
  };
  class UDPPort {
    constructor(config: UDPConfig);
    on(event: string, callback: (msg: any) => void): void;
    on(
      event: "message",
      callback: (msg: any, timeTag: any, info: any) => void
    ): void;
    off(event: string, callback: (msg: any) => void): void;
    send(msg: any): void;
    open(): void;
  }
}
