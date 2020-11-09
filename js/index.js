(function() {
  // 引入外部依赖
  var $ = window.$; // jQuery
  var utils = window.plvUtils; // 工具函数
  var PolyvLiveSdk = window.PolyvLiveSdk; // 直播JS-SDK

  // 用户 id。应设为用户系统中的用户 id，本 demo 生成方式仅供演示
  var userId = (new Date().getTime()).toString() +
    (10000 + parseInt(Math.random() * 90000));

  // 配置
  var config = {
    channelId: '1959557', // 频道号
    appId: 'fq4tg4iv38', // 直播后台AppID(应用ID)
    appSecret: '60dcbc40923346dfba47f24641d49f0e', // ！！！不建议 appSecret 暴露在前端中
    userId: 'polyv' + userId, // 设置用户id, 可以设置为用户系统里的用户 id
    //userId: '7864382c62',//'polyv' + userId, // 设置用户id, 可以设置为用户系统里的用户 idrole: 'viewer', // 角色, 用于获取授权和连麦token http://api.polyv.net/live/v3/channel/common/get-chat-token
  };

  var timestamp = +new Date(); // sign 生成所需的时间戳
  var els = {
    playerEl1: '#player',
    playerEl2: '#player2'
  };

  var plv = {
    liveSdk1: null,
    liveSdk2: null
  };

  initWatch();
  initWatch2();

  // 开始加载观看页
  function initWatch() {
    var channelInfoParams = {
      appId: config.appId,
      timestamp: timestamp,
      channelId: config.channelId
    };
    // ！！！不要在前端生成sign，此处仅供参考
    console.log('initWatch');
    channelInfoParams.sign = utils.getSign(config.appSecret, channelInfoParams);

    utils.getChannelInfo(channelInfoParams, function(res) {
      createLiveSdk();
    });
  }

  // 初始化直播JS-SDK, 文档： https://dev.polyv.net/2019/liveproduct/l-sdk/web-sdk/#ppt
  function createLiveSdk() {
    // ！！！不要在前端生成sign，此处仅供参考
    console.log('createLiveSdk');
    var sign = utils.getSign(config.appSecret, {
      appId: config.appId,
      channelId: config.channelId,
      timestamp: timestamp
    });

    plv.liveSdk1 = new PolyvLiveSdk({
      channelId: config.channelId,
      sign: sign,
      timestamp: timestamp,
      appId: config.appId,
      user: {
        userId: config.userId
      }
    });

    plv.liveSdk1.on(PolyvLiveSdk.EVENTS.CHANNEL_DATA_INIT, createLiveSdkPlayer); // 监听频道信息并初始化播放器
    plv.liveSdk1.on(PolyvLiveSdk.EVENTS.STREAM_UPDATE, handleStreamUpdate); // 监听流状态变化
  }

  // 创建播放器，文档: https://dev.polyv.net/2019/liveproduct/l-sdk/web-sdk/#i-7
  function createLiveSdkPlayer() {
    plv.liveSdk1.setupPlayer({
      el: els.playerEl1,
      type: 'auto'
    });

    // 监听直播JS-SDK的播放器事件，请参考实例 player 对象的事件
    plv.liveSdk1.player.on('fullscreenChange', handleFullscreenChange);
    plv.liveSdk1.player.on('switchMainScreen', switchPlayer);
  }

  // 流状态更新
  function handleStreamUpdate(event, status) {
    if (status === 'live') {
      alert('直播开始了，马上前往直播');
      destroy(); // 销毁观看页
      initWatch(); // 重新初始化观看页
    }
  }





  function initWatch2() {
    var channelInfoParams = {
      appId: config.appId,
      timestamp: timestamp,
      channelId: config.channelId
    };
    // ！！！不要在前端生成sign，此处仅供参考
    console.log('initWatch');
    channelInfoParams.sign = utils.getSign(config.appSecret, channelInfoParams);

    utils.getChannelInfo(channelInfoParams, function(res) {
      createLiveSdk2();
    });
  }

  // 初始化直播JS-SDK, 文档： https://dev.polyv.net/2019/liveproduct/l-sdk/web-sdk/#ppt
  function createLiveSdk2() {
    // ！！！不要在前端生成sign，此处仅供参考
    console.log('createLiveSdk');
    var sign = utils.getSign(config.appSecret, {
      appId: config.appId,
      channelId: config.channelId,
      timestamp: timestamp
    });

    plv.liveSdk2 = new PolyvLiveSdk({
      channelId: config.channelId,
      sign: sign,
      timestamp: timestamp,
      appId: config.appId,
      user: {
        userId: config.userId
      }
    });

    plv.liveSdk2.on(PolyvLiveSdk.EVENTS.CHANNEL_DATA_INIT, createLiveSdkPlayer2); // 监听频道信息并初始化播放器
    plv.liveSdk2.on(PolyvLiveSdk.EVENTS.STREAM_UPDATE, handleStreamUpdate2); // 监听流状态变化
  }

  // 创建播放器，文档: https://dev.polyv.net/2019/liveproduct/l-sdk/web-sdk/#i-7
  function createLiveSdkPlayer2() {
    plv.liveSdk2.setupPlayer({
      el: els.playerEl2,
      type: 'auto'
    });

    // 监听直播JS-SDK的播放器事件，请参考实例 player 对象的事件
    plv.liveSdk2.player.on('fullscreenChange', handleFullscreenChange);
    plv.liveSdk2.player.on('switchMainScreen', switchPlayer);
  }

  // 流状态更新
  function handleStreamUpdate2(event, status) {
    if (status === 'live') {
      alert('直播开始了，马上前往直播');
      destroy(); // 销毁观看页
      initWatch(); // 重新初始化观看页
    }
  }

})();
