import { Observable } from 'tns-core-modules/data/observable';
import { WechatSharingOptions } from './wechat-share.common';

export declare function initWechatSdk(wechatAppId: any): void;
export declare class WechatLogin extends Observable {
  constructor();
  doLogin(state?: string): boolean;
  share(options: WechatSharingOptions): boolean;
  isWechatInstalled(): boolean;
}
