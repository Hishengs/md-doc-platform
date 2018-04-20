<template>
	<div id="login" :style="{backgroundImage: `url(${config.serverUrl}/static/assets/code.png)`}">
		<div class="inner">
			<h2 class="title">请输入通行码</h2>
			<Input type="password" v-model="verifyCode" placeholder="请输入通行码" @on-enter="verify"></Input>
			<Button type="primary" @click="verify" long>进入</Button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data (){
			return {
				verifyCode: '',
			};
		},
		methods: {
			verify (){
				if(this.verifyCode === 'Passw0rd'){
					// window.verified = true;
					localStorage.setItem('verified', true);
					localStorage.setItem('last-login', (new Date()).getTime());
					window.location.href = window.location.href.split('#')[0];
					// this.$router.push('/');
				}else {
					this.$Message.error('通行码不正确');
				}
			},
		}
	};
</script>

<style lang= "less">
	#login {
		z-index: 999;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		color: #ffffff;
		.inner {
			.title {
				font-weight: normal;
			}
			width: 300px;
			padding-top: 150px;
			margin: 0 auto;
			text-align: center;
			.ivu-input {
				margin: 15px 0;
			}
		}
	}
</style>