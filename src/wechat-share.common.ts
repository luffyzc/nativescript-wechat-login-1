import { ImageSource } from '@nativescript/core/image-source'

export interface WechatSharingOptions {
    scene: WechatSharingScene;
    messages?: WechatSharingMessages;
    text?: string;
}
export interface WechatSharingMessages {
    title?: string;
    description?: string;
    thumb?: string;
    media: WechatSharingMedia;
}
export interface WechatSharingMedia {
    type?: WechatSharingType;
    image?: ImageSource;
    musicUrl?: string;
    videoUrl?: string;
    webpageUrl?: string;
}
export enum WechatSharingScene {
    SESSION = 0,
    TIMELINE = 1,
    FAVORITE = 2,
}
export enum WechatSharingType {
    TYPE_SHARING_TEXT = 1,
    TYPE_SHARING_IMAGE = 2,
    TYPE_SHARING_MUSIC = 3,
    TYPE_SHARING_VIDEO = 4,
    TYPE_SHARING_WEBPAGE = 5,
}

export function buildSendMessageToWXReq(options: WechatSharingOptions): SendMessageToWXReq {
    let req = SendMessageToWXReq.alloc();
    switch (options.scene) {
        case WechatSharingScene.FAVORITE:
            req.scene = WXScene.Favorite;
            break;
        case WechatSharingScene.TIMELINE:
            req.scene = WXScene.Timeline;
            break;
        case WechatSharingScene.SESSION:
            req.scene = WXScene.Session;
            break;
        default:
            req.scene = WXScene.Timeline;
    }
    req.text = options.text;
    req.bText = !!options.text;
    if (options.messages) {
        req.message = buildWxMediaMessage(options.messages);
    }
    return req;
}

function buildWxMediaMessage(message: WechatSharingMessages): WXMediaMessage {
    let wechatMediaMessage = WXMediaMessage.alloc();
    wechatMediaMessage.title = message.title;
    wechatMediaMessage.description = message.description;
    const media = message.media;

    let type = media.type ? media.type : WechatSharingType.TYPE_SHARING_WEBPAGE;

    let mediaObject = null;
    switch (type) {
        case WechatSharingType.TYPE_SHARING_IMAGE:
            mediaObject = new WXImageObject();
            mediaObject.imageData = UIImagePNGRepresentation(media.image.ios);
            break;
        case WechatSharingType.TYPE_SHARING_MUSIC:
            mediaObject = new WXMusicObject();
            mediaObject.musicUrl = media.musicUrl;
            break;
        case WechatSharingType.TYPE_SHARING_VIDEO:
            mediaObject = new WXVideoObject();
            mediaObject.videoUrl = media.videoUrl;
            break;
        case WechatSharingType.TYPE_SHARING_WEBPAGE:
        default:
            mediaObject = new WXWebpageObject();
            mediaObject.webpageUrl = media.webpageUrl;
    }

    wechatMediaMessage.mediaObject = mediaObject;

    return wechatMediaMessage;
}