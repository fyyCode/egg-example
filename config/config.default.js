/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1659410075799_5739';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    httpclient:{
        // 是否开启本地 DNS 缓存，默认关闭，开启后有两个特性
        // 1. 所有的 DNS 查询都会默认优先使用缓存的，即使 DNS 查询错误也不影响应用
        // 2. 对同一个域名，在 dnsCacheLookupInterval 的间隔内（默认 10s）只会查询一次
        enableDNSCache: true,
        // 对同一个域名进行 DNS 查询的最小间隔时间
        dnsCacheLookupInterval: 10000,
        // DNS 同时缓存的最大域名数量，默认 1000
        dnsCacheMaxLength: 1000,

        request: {
          // 默认 request 超时时间
          timeout: 5000,
        },
    }
  };
};
