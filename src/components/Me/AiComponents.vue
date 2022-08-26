<template>
  <div class="ai-components">
    <div class="header">
      <van-nav-bar
            title="在线客服"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
    <div class="content">
      <div v-for="(item, index) in info" :key="index">
        <div class="info_r info_default" v-if="item.type == 'leftinfo'">
          <span class="circle circle_r"></span>
          <div class="con_r con_text">
            <div>{{ item.content }}</div>
            <div v-for="(item2, index) in item.question" :key="index">
              <div class="con_que" @click="clickRobot(item2.content, item2.id)">
                <div class="czkj-question-msg">
                  {{ item2.index }}
                  {{ item2.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="time_r">{{ item.time }}</div>
        </div>

        <div class="info_l" v-if="item.type == 'rightinfo'">
          <div class="con_r con_text">
            <span class="con_l">{{ item.content }}</span>
            <span class="circle circle_l">
              <img src="@/assets/tpp.png" class="pic_l" />
            </span>
          </div>
          <div class="time_l">{{ item.time }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-cell-group>
        <van-field center placeholder="请输入您要咨询的问题" @keyup.enter="sentMsg()" v-model="customerText" />
      </van-cell-group>
      <el-button @click="sentMsg()">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "onlineCustomer",
  components: {},
  computed: {},
  data() {
    return {
      customerText: "",
      info: [
        {
          type: "leftinfo",
          time: this.getTodayTime(),
          name: "robot",
          content:
            "您好，欢迎使用淘票票，为保证账户安全，在会话过程中请勿透露您的账号、",
          question: [],
        },
      ],
      timer: null,
      robotQuestion: [
        { id: 1, content: "优惠券过期怎么办？", index: 1 },
        { id: 2, content: "影城卡是否能够退款", index: 2 },
        { id: 3, content: "退改签后优惠劵会退回吗？", index: 3 },
        {
          id: 4,
          content: "影城卡购票可以减多少钱？",
          index: 4,
        },
        { id: 5, content: "买一赠一券使用规则", index: 5 },
      ],
      robotAnswer: [
        {
          id: 1,
          content:
            "亲，1）如果是您通过积分兑换或免费领取的代金券或兑换券，过期后就作废无法使用了，请务必尽快使用，不能延期。2）如果您是在淘票票app或支付宝电影演出小程序中花钱购买的代金券或其它类型的优惠券，没有使用的话，过期会自动退款，您也可以在“我的-优惠券-优惠券订单-券订单详情“申请退款。",
          index: 1,
        },
        { id: 2, content: "亲亲，影城卡开通后无法退卡，在付款前有弹窗提示哦～小蜜也很想帮助主人，可是确实没有办法呢如果给主人带了不便，小蜜在这里给主人道个歉,希望主人能够谅解呢。小蜜建议亲亲如果您不想使用，后续可以帮亲朋好友购买电影票，还是相当划算的哦~", index: 2 },
        {
          id: 3, content: `亲亲，电影票如果产生退票行为：

【观影特惠活动】：包括平台立减和影院自促立减、减至、折扣，特惠活动的资格返还（返还后以最新规则为准）；

【银行活动】：银行优惠资格不会返还；

【代金券，兑换券】：原路返回，若到期不可用；

电影票如果产生改签行为：

优惠券及活动不予重复参与，优惠券会返回（若到期不可使用），当前改签单无法使用原有优惠。

小蜜提示主人：以上仅限电影票退改哦～卖品等退换不返还券和活动资格`, index: 3
        },
        {
          id: 4,
          content: "不同影院的影城卡减免的价格不同，具体可以在该影院购票页面查看",
          index: 4,
        },
        { id: 5, content: "亲亲，买一赠一券是仅支持部分影城，单张电影票可用于60元以内的场次使用，不限制影厅；不可与特惠票、限时特价叠加；", index: 5 },
      ],
    };
  },
  created() {
    this.showTimer();
  },
  watch: {},
  methods: {
    onClickLeft() {
                history.go(-1)
            },
    // 用户发送消息
    sentMsg() {
      clearTimeout(this.timer);
      this.showTimer();
      let text = this.customerText.trim();
      if (text != "") {
        var obj = {
          type: "rightinfo",
          time: this.getTodayTime(),
          content: text,
        };
        this.info.push(obj);
        this.appendRobotMsg(this.customerText);
        this.customerText = "";
        this.$nextTick(() => {
          var contentHeight = document.getElementById("content");
          contentHeight.scrollTop = contentHeight.scrollHeight;
        });
      }
    },
    // 机器人回答消息
    appendRobotMsg(text) {
      clearTimeout(this.timer);
      this.showTimer();
      text = text.trim();
      let answerText = "";
      let flag;
      for (let i = 0; i < this.robotAnswer.length; i++) {
        if (this.robotAnswer[i].content.indexOf(text) != -1) {
          flag = true;
          answerText = this.robotAnswer[i].content;
          break;
        }
      }
      if (flag) {
        let obj = {
          type: "leftinfo",
          time: this.getTodayTime(),
          name: "robot",
          content: answerText,
          question: [],
        };
        this.info.push(obj);
      } else {
        answerText = "您可能想问：";
        let obj = {
          type: "leftinfo",
          time: this.getTodayTime(),
          name: "robot",
          content: answerText,
          question: this.robotQuestion,
        };
        this.info.push(obj);
      }
      this.$nextTick(() => {
        var contentHeight = document.getElementById("content");
        contentHeight.scrollTop = contentHeight.scrollHeight;
      });
    },
    sentMsgById(val, id) {
      clearTimeout(this.timer);
      this.showTimer();

      let robotById = this.robotAnswer.filter((item) => {
        return item.id == id;
      });
      let obj_l = {
        type: "leftinfo",
        time: this.getTodayTime(),
        name: "robot",
        content: robotById[0].content,
        question: [],
      };
      let obj_r = {
        type: "rightinfo",
        time: this.getTodayTime(),
        name: "robot",
        content: val,
        question: [],
      };
      this.info.push(obj_r);
      this.info.push(obj_l);
      this.$nextTick(() => {
        var contentHeight = document.getElementById("content");
        contentHeight.scrollTop = contentHeight.scrollHeight;
      });
    },
    // 点击机器人的单个问题
    clickRobot(val, id) {
      this.sentMsgById(val, id);
    },
    // 结束语
    endMsg() {
      let happyEnding = {
        type: "leftinfo",
        time: this.getTodayTime(),
        content: "退下吧",
        question: [],
      };
      this.info.push(happyEnding);
      this.$nextTick(() => {
        var contentHeight = document.getElementById("content");
        contentHeight.scrollTop = contentHeight.scrollHeight;
      });
    },
    showTimer() {
      this.timer = setTimeout(this.endMsg, 1000 * 60);
    },
    getTodayTime() {
      // 获取当前时间
      var day = new Date();
      let seconds = day.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      } else {
        seconds = seconds;
      }
      let minutes = day.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      } else {
        minutes = minutes;
      }
      let time =
        day.getFullYear() +
        "-" +
        (day.getMonth() + 1) +
        "-" +
        day.getDate() +
        " " +
        day.getHours() +
        ":" +
        minutes +
        ":" +
        seconds;
      return time;
    },
  },
  mounted() { },
  props: {},
  destroyed() { },
};
</script>

<style  scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.ai-components {
  background-color: #e9e9e9;
  width: 100%;
  height: 100vh;
}

.header {
  background-color: white;
  ;
  width: 100%;
  height: 5%;
  text-align: center;


}

.header span {
  display: block;
  padding-top: 8px;
}

.content {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  font-size: 14px;
}

.con_que {
  color: #1c88ff;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.circle {
  display: inline-block;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #eff1f3;
}

.con_text {
  color: #333;
  margin-bottom: 5px;
}

.con_que {
  color: #1c88ff;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.info_r {
  position: relative;
  margin-top: 20px;

  .circle_r {
    position: absolute;
    left: 0%;
  }

  .pic_r {
    width: 17px;
    height: 17px;
    margin: 8px;
  }

  .con_r {
    display: inline-block;
    /* max-width: 253px; */
    width: 55%;
    min-height: 55px;
    /* min-height: 20px; */
    background-color: #e2e2e2;
    border-radius: 6px;
    padding: 10px;
    margin-left: 40px;
  }

  .time_r {
    margin-left: 45px;
    color: #999999;
    font-size: 12px;
  }
}

.info_l {
  text-align: right;
  color: #ffffff;
  color: #3163C5;
  margin-top: 10px;

  .pic_l {
    width: 13px;
    height: 17px;
    margin: 8px 10px;
  }

  .time_l {
    margin-right: 45px;
    color: #999999;
    font-size: 12px;
    margin-top: 5px;
  }

  .con_l {
    display: inline-block;
    width: 220px;
    min-height: 51px;
    background-color: #3163C5;
    border-radius: 6px;
    padding: 10px;
    text-align: left;
    color: #fff;
    margin-right: 5px;
  }
}

.czkj-question-msg {
  float: left;
  font-size: 14px;
  color: #3163C5;
}

.footer {
  width: 100%;
  height: 5%;
  background-color: blanchedalmond;
  display: flex;
}
</style>
<style scoped>
.van-cell-group {
  width: 70%;
  height: 51px;
}

.el-button {
  width: 30%;
  height: 42px
}
</style>