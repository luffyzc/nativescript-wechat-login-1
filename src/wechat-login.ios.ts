import { Observable } from 'tns-core-modules/data/observable';
import { WechatSharingOptions, buildSendMessageToWXReq } from './wechat-share.common';

const setupAppDeligate = require('./getappdelegate').setupAppDeligate;

export function initWechatSdk(wechatAppId, universalLink) {
    setupAppDeligate(wechatAppId, universalLink);
}

export class WechatLogin extends Observable {

    constructor() {
        super();
    }

    /**
     * doLogin
     */
    public doLogin(state = '') {

        let req = SendAuthReq.alloc();
        req.scope = "snsapi_userinfo";

        if (state !== '') {
            req.state = state;
        }

        WXApi.sendReqCompletion(req, function (res) {
            return res;
        });
    }

    /**
     * Share to wechat
     */
    public share(options: WechatSharingOptions) {

        let req = buildSendMessageToWXReq(options);

        WXApi.sendReqCompletion(req, function (res) {
            return res;
        });
    }

    /**
     * isWechatInstalled
     */
    public isWechatInstalled() {
        return WXApi.isWXAppInstalled();
    }
}