import mqtt from "mqtt/dist/mqtt";

class MqttService {
  constructor(api) {
    this.api = api;
    this.client = null;
  }
  initMqtts() {
    // 确保 api.IP 被提供
    if (!this.api.IP) {
      return Promise.reject(new Error("MQTT server IP is required"));
    }
    // 连接配置选项
    const options = {
      clean: true,
      connectTimeout: 4000,
      clientId:
        "pc_emqx" +
        Math.random()
          .toString(16)
          .slice(2),
      username: "13045778437",
      password: "123456",
      keepalive: 60,
    };
    // 创建一个新的 MQTT 客户端实例
    const client = mqtt.connect(this.api.IP, options);
    return new Promise((resolve, reject) => {
      // 监听连接事件
      client.on("connect", () => {
        // console.log('MQTT connected');
        this.client = client; // 保存客户端实例供后续使用
        resolve(this.client); // 连接成功后解析 Promise
      });
      // 监听错误事件
      client.on("error", (err) => {
        console.error("MQTT connection error:", err);
        reject(err); // 连接错误时拒绝 Promise
      });
    });
  }

  // 取消订阅方法
  unsubscribe(topics) {
    if (!this.client || !this.client.connected) {
      return Promise.reject(new Error("MQTT client is not connected"));
    }
    // 如果 topics 是一个字符串，则将其转换为数组
    if (typeof topics === "string") {
      topics = [topics];
    }
    return new Promise((resolve, reject) => {
      this.client.unsubscribe(topics, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  //  断开连接
  disconnect() {
    if (this.client && this.client.connected) {
      this.client.end(true, () => {
        // console.log("MQTT client disconnected");
      });
      this.client = null;
    }
  }
}

export default MqttService;
