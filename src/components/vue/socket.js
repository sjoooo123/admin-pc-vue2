import SockJS from "sockjs-client";
import Stomp from "stompjs";
import store from "@/store";
export default {
    name: "layout",
    data() {
        return {
            stompClient: ""
        };
    },
    mounted() {
        this.initWebSocket();
    },
    beforeDestroy() {
    // 页面离开时断开连接
        this.disconnect();
    },
    methods: {
        initWebSocket() {
            const userId = localStorage.getItem("userId"),
                token = localStorage.getItem("token");

            if (userId && token) {
                this.userId = userId;
                this.connection();
            }
        },
        connection() {
            // 建立连接对象
            let socket = new SockJS("/endpoint"),
                // 定义客户端的认证信息,按需求配置
                headers = {
                    // Authorization: ""
                };
            // 获取STOMP子协议的客户端对象

            this.stompClient = Stomp.over(socket);
            // 关闭连接日志
            this.stompClient.debug = null;
            // 向服务器发起websocket连接

            this.stompClient.connect(
                headers,
                () => {
                    console.log("connected!"); // eslint-disable-line

                    // 订阅
                    this.stompClient.subscribe(
                        "/user/" + this.userId + "/queue/notifications",
                        response => {
                            if (response) {
                                const pushMessage = JSON.parse(response.body),
                                    message = pushMessage.info;

                                console.log("推送", pushMessage); // eslint-disable-line
                                switch (pushMessage.type) {
                                case 30:
                                    // 水印投放推送
                                    store.commit("operationalTool/setPutinProgress", message);
                                    break;
                                default:
                                    break;
                                }
                            }
                        },
                        headers
                    );
                    //用户加入接口
                    // this.stompClient.send(
                    //   "/app/chat.addUser",
                    //   headers,
                    //   JSON.stringify({ sender: "", chatType: "JOIN" })
                    // );
                },
                err => {
                    // 连接发生错误时的处理函数
                    console.log("连接失败:" + err); // eslint-disable-line
                    // 重连
                    this.initWebSocket();
                }
            );
        },
        // 断开连接
        disconnect() {
            if (this.stompClient) {
                console.log("disconnected!"); // eslint-disable-line
                this.stompClient.disconnect();
            }
        }
    },
    render() {
        return {};
    }
};
