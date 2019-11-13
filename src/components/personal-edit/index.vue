<template>
  <div>
    <div class="personal-edit-wrap">
      <div class="personal-edit-head clear">
        <p class="edit-head-title">头像</p>
        <div class="edit-head-content">
          <img
            :src="userLogo"
            alt=""
          >
        </div>
      </div>
      <div
        class="personal-edit-name personal-edit clear"
        @click="getEditText"
      >
        <p class="edit-name-title edit-title">用户名</p>
        <i class="personal-edit-icon"></i>
        <div class="edit-name-content edit-content">
          <p>{{editUserName}}</p>
        </div>
      </div>
      <div
        class="personal-edit-gender personal-edit clear"
        @click="Showsel"
      >
        <p class="edit-gender-title edit-title">性别</p>
        <i class="personal-edit-icon"></i>
        <div class="edit-gender-content edit-content">
          <p>{{editGender}}</p>
        </div>
      </div>
      <div
        class="personal-edit-userBirthday personal-edit clear"
        @click="openPicker"
      >
        <p class="edit-userBirthday-title edit-title">出生日期</p>
        <i class="personal-edit-icon"></i>
        <div class="edit-userBirthday-content edit-content">
          <p>{{userBirthday}}</p>
        </div>
      </div>
    </div>
    <div class="blank" v-if="isBlank" @click="concealSel"></div>
        <div class="selGender" v-if="isShowselGender">
          <h2 class="genderTitle">性别</h2>
          <div class="selman" @click="isSelman">
            <label>男</label><input name="sex" type="radio" value="1" v-model="editGenderType" ref="man"/>
          </div>

          <div class="selweman" @click="isSelweman">
            <label>女</label><input name="sex" type="radio" value="2" v-model="editGenderType" ref="weman"/>
          </div>
        </div>
    <div
      class="personal-edit-comfirm"
      @click="comEditData"
    >
      保存
    </div>
    <!-- 日期选择 -->
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value}年"
      month-format="{value}月"
      date-format="{value}日"
      @confirm="handleConfirm"
      :start-date="startDate"
      :end-date="new Date()"
      v-model="pickerValue">
    </mt-datetime-picker>
    <!--  -->
    <div v-if="isShowEditName" class="input-name">
        <div class="inputEdit-wrap">
            <input type="text" :placeholder="placeholder" name="edit" class="edit-input" v-model="editText">
        </div>
        <div @click="back" class="edit-input-btn">确定</div>
    </div>
  </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
export default {
  data() {
    return {
      parms: "", //传递修改类型
      editUserName: "",
      editGender: "",
      userLogo: "http://img01.fabric.cn/guideimg/app_def.png",
      token: "",
      editGenderType: 3,
      userBirthday: "",//用户生日
      isShowselGender:false,//是否显示选择男女
      pickerValue:'',//时间选择器获得值
      startDate: new Date('1920-01-01'),//开始时间
      placeholder:"请输入要修改的用户名",
      editText:'',//接收到的要修改的类型
      isShowEditName:false,
      isBlank:false
    };
  },
  components:{
    "mt-datetime-picker":DatetimePicker,
  },
  mounted() {
    var _that = this;
    if (localStorage.getItem("_token_")) {
      this.token=localStorage.getItem('_token_')
      if (localStorage.getItem('_isBdMobile_')&&localStorage.getItem('_isBdMobile_')==1) {//判断手机是否绑定
        localStorage.setItem('_url_','/edit')
        this.$router.push('/syxidou')
      }
      //console.log(this.token)
      if(this.token){
        this.GLOBAL.crmPost(
              '/user/getLoginUserInfo',
              {
              }
          )
        .then(res=>{
            var data=res.data.data
            if (res.data.code==200) {
              this.editUserName=data.custNameNc
              var userBirthdayStr=data.userBirthday.substring(0, 10)
              this.userBirthday=userBirthdayStr
              if (data.sex==1) {
                this.editGenderType=1
              }else if(data.sex==2){
                this.editGenderType=2
              }else{
                this.editGenderType=3
              }
            }else if(res.data.code==201){
              localStorage.clear()
              this.$router.push('/author')
            }
          }).catch(()=>{
            this.$toast.center("请求错误");
          })
      }
    } else {
      this.$router.push("/author");
    }
  },
  methods: {
    getEditText() {
      this.isShowEditName=true;
      this.isBlank=true
    },
    comEditData() {
      //修改更新数据
      var _that = this;
        this.GLOBAL.crmPost(
            '/user/modifyLoginUserInfo',
            {
              sex:_that.editGenderType,
              custNameNc:_that.editUserName,
              userBirthday:this.userBirthday
            }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.center(res.data.msg);
          } else {
            this.$toast.center(res.data.msg);
          }
        }).catch(()=>{
            this.$toast.center("更新错误");
        })
    },
    Showsel(){//控制显示选择性别组件
      this.isShowselGender=true
      this.isBlank=true
    },
    concealSel(){//控制隐藏选择性别组件
      this.isShowselGender=false
      this.isShowEditName=false
      this.isBlank=false
    },
    isSelman(){//选择男
      this.editGenderType=1;
      this.concealSel()
    },
    isSelweman(){//选择女
      this.editGenderType=2;
      this.concealSel()
    },
    openPicker() {
      this.pickerValue=new Date()
      this.$refs.picker.open();
    },
    handleConfirm(){//日期选择器的确定事件
      this.userBirthday=this.formatDate(this.pickerValue)//调用时间格式转换时间函数
    },
    formatDate(date) {//转换时间
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    back(){//点击确定提交修改资料
      if(this.verdictEditText()){
        this.editUserName= this.editText;
        this.isShowEditName=false
        this.isBlank=false
      }
    },
    verdictEditText(){//判断输入的内容是否格式
        if(!this.editText){
            this.$toast.center("内容不能为空");
          }else{
            if(this.editText.length>=30){
                this.$toast.center("用户名长度过长");
            }else{
                return true
            }
        }

    },
  },
  watch:{
    editGenderType:function () {
      if (this.editGenderType==1) {
        this.editGender="男"
      }else if (this.editGenderType==2) {
        this.editGender="女"
      }else{
        this.editGender="未设置"
      }
    }
  }
};
</script>
<style lang="less" scoped>

.clear:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.personal-edit-icon {
  width: 0.13rem;
  height: 0.13rem;
  float: right;
  border: 0.02rem solid #999999;
  border-left-color: transparent;
  border-bottom-color: transparent;
  display: block;
  transform: rotate(45deg);
  position: relative;
  top: 0.36rem;
  left: -0.1rem;
  margin: 0 0.3rem 0 0.2rem;
}
// -----------------------
.personal-edit-wrap {
  width: 100%;
  height: auto;
  color: #333333;
  font-size: 0.3rem;
  padding-bottom: 1.1rem;
  .personal-edit-head {
    width: 100%;
    height: 1.42rem;
    margin: 0.2rem 0;
    border-top: 0.01rem solid #f1f1f1;
    border-bottom: 0.01rem solid #f1f1f1;
    box-sizing: border-box;
    .edit-head-title {
      margin-left: 0.3rem;
      line-height: 1.42rem;
      float: left;
    }
    .edit-head-content {
      float: right;
      margin-right: 0.3rem;
      margin-top: 0.26rem;
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
        font-size: 0;
        background-color: #cf3327;
      }
    }
  }
  //公共样式-------start---
  .personal-edit {
    width: 100%;
    height: 0.9rem;
    border-top: 0.01rem solid #f1f1f1;
    box-sizing: border-box;
  }
  .edit-title {
    margin-left: 0.3rem;
    line-height: 0.89rem;
    float: left;
  }
  .edit-content {
    float: right;
    height: 0.59rem;
    margin-top: 0.3rem;
    color: #999999;
  }
  //----end------
  .personal-edit-name {
    border-bottom: 0;
  }
  .personal-edit-gender {
    border-bottom: 0.01rem solid #f1f1f1;
    margin-bottom: 0.2rem;
  }
}

.personal-edit-comfirm {
  width: 6.9rem;
  margin: 0 auto;
  height: 0.9rem;
  text-align: center;
  color: #ffffff;
  line-height: 0.9rem;
  font-size: 0.3rem;
  border-radius: 0.08rem;
  /*! autoprefixer: off */
  background: -webkit-linear-gradient(top, #fa5c4d, #d73036);
  /*! autoprefixer: no */
  background: -moz-linear-gradient(top, #fa5c4d, #d73036);
  background: -o-linear-gradient(top, #fa5c4d, #d73036);
  background: linear-gradient(top, #fa5c4d, #d73036);
}
.selGender{
  position: fixed;
  width: 80%;
  left: 10%;
  top: 20%;
  background-color: #ffffff;
  font-size: 0.28rem;

  z-index: 10;
  border-radius: 0.12rem;
  .genderTitle{
    margin: 0.4rem 0;
    font-size: 0.3rem;
    font-weight: 600;
    text-align: center;
  }
  .selman{
    width: 80%;
    margin: 0 auto;
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.01rem solid #eeeeee
  }
  .selweman{
    width: 80%;
    margin: 0 auto;
    padding: 0.3rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem
  }
}
.blank{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333333;
  opacity: 0.3;
}
.inputEdit-wrap{
    width: 80%;
    margin: 0 auto;
    padding: 0.01rem 0;
    border-bottom:0.01rem solid #999999;
    .edit-input{
        width: 80%;
        font-size: 0.3rem;
        color: #333333;
        border: 0;
        border-radius: 0;
        height: 0.9rem;
        margin-left: 0.2rem;
    }
}
.edit-input-btn{
    width: 50%;
    margin: 1rem auto;
    height: 0.9rem;
    text-align: center;
    color: #ffffff;
    line-height: 0.9rem;
    font-size: 0.3rem;
    border-radius: 0.08rem;
    /*! autoprefixer: off */
    background: -webkit-linear-gradient(top, #fa5c4d, #d73036);
    /*! autoprefixer: no */
    background: -moz-linear-gradient(top, #fa5c4d, #d73036);
    background: -o-linear-gradient(top, #fa5c4d, #d73036);
    background: linear-gradient(top, #fa5c4d,#d73036);
}
.input-name{
  width: 80%;
  position: absolute;
  top: 3rem;
  left: 10%;
  background-color: #ffffff;
  border-radius: 0.12rem;
}
</style>
