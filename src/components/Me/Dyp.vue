<template>
    <div>
        <van-nav-bar title="我的电影票" left-arrow @click-left="onClickLeft" />
        <img src="@/assets/me/bj.jpg" style="width:100%" alt="" v-if="!data.phone_code">
        <div v-for="(item,index) in data" :key="index">
            <div class="cardWrap">
                <div class="card cardLeft">
                    <h1>淘气 <span>电影</span></h1>
                    <div class="title">
                        <h2>{{item.name}}</h2>
                        <span>电影</span>
                    </div>
                    <div class="name">
                        <h2>{{item.cinema_name}}</h2>
                        <span>影院</span>
                    </div>
                    <div class="seat">
                        <h2>{{item.phone_code}}</h2>
                        <span>取票码</span>
                    </div>
                    <div class="time">
                        <h2>{{item.show_time}}</h2>
                        <span>time</span>
                    </div>
                </div>
                <div class="card cardRight">
                    <div class="eye"></div>
                    <div class="number">
                        <h3>{{item.phone_code}}</h3>
                        <span>取票码</span>
                    </div>
                    <div class="barcode"></div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            userid: '',
            data: [],
        }
    },
    mounted() {
        if (JSON.parse(sessionStorage.getItem('user'))) {
            this.userid = JSON.parse(sessionStorage.getItem('user'))[0].user_id
        } else {
            this.userid = ''
        }
        this.axios.get(`index/getOrderByUserId?userId=${this.userid}`).then((res => {
            console.log(res);
            this.data = res.data.data
        }))
    },
    methods: {
        onClickLeft() {
            history.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
$red: #e84c3d;
$grey: #ecedef;
$black: #343434;

.cardWrap {
    width: 27em;
    margin: 1.5em auto;
    color: #fff;
    font-family: sans-serif;
}

.card {
    background: linear-gradient(to bottom, $red 0%, $red 26%, $grey 26%, $grey 100%);
    height: 11em;
    float: left;
    position: relative;
    padding: 1em;
    margin-top: 100px;
}

.cardLeft {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 11em;
    margin-left:20px;
    margin-top: 15px;
}

.cardRight {
    width: 6.5em;
    border-left: .18em dashed #fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: 15px;
    &:before,
    &:after {
        content: "";
        position: absolute;
        display: block;
        width: .9em;
        height: .9em;
        background: #fff;
        border-radius: 50%;
        left: -.5em;
    }

    &:before {
        top: -.4em;
    }

    &:after {
        bottom: -.4em;
    }
}

h1 {
    font-size: 1.1em;
    margin-top: 0;

    span {
        font-weight: normal;
    }
}

.title,
.name,
.seat,
.time {
    text-transform: uppercase;
    font-weight: normal;

    h2 {
        font-size: .5em;
        color: #525252;
        margin: 0;
    }

    span {
        font-size: .7em;
        color: #a2aeae;
    }
}

.title {
    margin: 2em 0 0 0;
}

.name,
.seat {
    margin: .7em 0 0 0;
}

.time {
    margin: .7em 0 0 1em;
}

.seat,
.time {
    float: left;
}

.eye {
    position: relative;
    width: 2em;
    height: 1.5em;
    background: #fff;
    margin: 0 auto;
    border-radius: 1em/0.6em;
    z-index: 1;

    &:before,
    &:after {
        content: "";
        display: block;
        position: absolute;
        border-radius: 50%;
    }

    &:before {
        width: 1em;
        height: 1em;
        background: $red;
        z-index: 2;
        left: 8px;
        top: 4px;
    }

    &:after {
        width: .5em;
        height: .5em;
        background: #fff;
        z-index: 3;
        left: 12px;
        top: 8px;
    }
}

.number {
    text-align: center;
    text-transform: uppercase;

    h3 {
        color: $red;
        margin: 0.9em 0px 10px -4px;
        font-size: 2.0em;

    }

    span {
        display: block;
        color: #a2aeae;
    }
}

.barcode {
    height: 2em;
    width: 0;
    margin: 1.2em 0 0 .8em;
    box-shadow: 1px 0 0 1px $black,
        5px 0 0 1px $black,
        10px 0 0 1px $black,
        11px 0 0 1px $black,
        15px 0 0 1px $black,
        18px 0 0 1px $black,
        22px 0 0 1px $black,
        23px 0 0 1px $black,
        26px 0 0 1px $black,
        30px 0 0 1px $black,
        35px 0 0 1px $black,
        37px 0 0 1px $black,
        41px 0 0 1px $black,
        44px 0 0 1px $black,
        47px 0 0 1px $black,
        51px 0 0 1px $black,
        56px 0 0 1px $black,
        59px 0 0 1px $black,
        64px 0 0 1px $black,
        68px 0 0 1px $black,
        72px 0 0 1px $black,
        74px 0 0 1px $black,
        77px 0 0 1px $black,
        81px 0 0 1px $black;
}
</style>