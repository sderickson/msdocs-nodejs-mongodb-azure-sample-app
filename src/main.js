import { RetellWebClient } from 'retell-client-js-sdk';

// just do this so it bundles the sdk for the browser
const retellWebClient = new RetellWebClient();
window.retellWebClient = retellWebClient;