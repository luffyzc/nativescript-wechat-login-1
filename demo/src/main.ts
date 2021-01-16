// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { initWechatSdk } from "nativescript-wechat-login-knotes";

import { AppModule } from "./app/app.module";

initWechatSdk("wx9b28993d5c8d294b", 'https://knotesapp.cn/iosApp/');

platformNativeScriptDynamic().bootstrapModule(AppModule);
